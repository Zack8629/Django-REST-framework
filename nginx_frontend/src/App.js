import './App.css';
import React from "react";
import axios from "axios";
import UsersList from "./components/Users";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ProjectsList from "./components/Projects";
import ToDoList from "./components/ToDos";
import {BrowserRouter, HashRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import UserProjectsList from "./components/UserProjects";
import Cookies from "universal-cookie/es6";
import LoginForm from "./components/Auth";
import ProjectUsersList from "./components/ProjectUsers";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";

const URL_ROOT = 'http://127.0.0.1:8000'
const getUrl = (catalog) => `${URL_ROOT}/api/${catalog}/`

const pageNotFound404 = ({location}) => {
    return (
        <h1>Page '{location.pathname}' not found</h1>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todos: [],
            token: ''
        }
    }

    logout() {
        this.setToken('');
        window.location.reload();
    }

    getToken(username, password) {
        axios.post(
            `${URL_ROOT}/api-token-auth/`,
            {username: username, password: password}
        ).then(response => {
            this.setToken(response.data['token'])
        }).catch(() => alert('Неверный логин или пароль'))
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
        window.location.href = '/';
    }

    loadData() {
        if (!this.isAuthenticated()) {
            return;
        }
        const headers = this.getHeaders()

        axios.get(getUrl('users'), {headers})
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))

        axios.get(getUrl('projects'), {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))

        axios.get(getUrl('todos'), {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error))
    }

    getHeaders() {
        let headers = {'Content-Type': 'application/json'}
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`;
        }
        return headers
    }

    isAuthenticated() {
        return this.state.token !== '';
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    projectDelete(id) {
        const headers = this.getHeaders()
        axios.delete(getUrl(`projects/${id}`), {headers})
            .then(() => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }

    projectCreate(name, repository, users) {
        const data = {name: name, repository: repository, users: Array.from(users)}
        // console.log('projectCreate->', data);

        const headers = this.getHeaders();
        axios.post(getUrl('projects'), data, {headers})
            .then(result => {
                const newProject = result.data;
                this.setState({projects: [...this.state.projects, newProject]})
            }).catch(error => console.log(error.response, error.request))
    }

    toDoDelete(id) {
        const headers = this.getHeaders()
        axios.delete(getUrl(`todos/${id}`), {headers})
            .then(() => {
                this.setState({
                    todos: this.state.todos.filter((item) => item.id !== id)
                })
            }).catch(error => console.log(error))
    }

    toDoCreate(text, project, author, is_active) {
        console.log(text, project, author, is_active)
        const data = {text: text, is_active: is_active, project: project, author: author}

        const headers = this.getHeaders();
        axios.post(getUrl('todos'), data, {headers})
            .then(result => {
                const newToDo = result.data;
                this.setState({todos: [...this.state.todos, newToDo]})
            }).catch(error => console.log(error.response, error.request))
    }

    render() {
        return (
            <div className={'App'}>
                <div className={'wrapper'}>
                    <HashRouter>
                        <BrowserRouter>
                            <div className={'menu'}>
                                <Menu/>
                                <li className={'in-out'}>
                                    {this.isAuthenticated() ?
                                        <button onClick={() => this.logout()}>
                                            Logout
                                        </button> :
                                        <button className={'btn-login'}>
                                            <Link to={'/login/'}>
                                                Login
                                            </Link>
                                        </button>}
                                </li>
                            </div>
                            <div className={'content'}>
                                <div className={'table-api'}>
                                    <Switch>
                                        <Route exact path={'/login/'}>
                                            <LoginForm
                                                getToken={(username, password) =>
                                                    this.getToken(username, password)}/>
                                        </Route>

                                        <Redirect from={'/users/'} to={'/'}/>
                                        <Route exact path={'/'}
                                               component={() => <UsersList users={this.state.users}/>}/>
                                        <Route exact path={'/user/:id/'}
                                               component={() => <UserProjectsList projects={this.state.projects}/>}/>


                                        <Route exact path={'/projects/'}
                                               component={() => <ProjectsList
                                                   projectDelete={(id) => this.projectDelete(id)}
                                                   projects={this.state.projects}/>}/>

                                        <Route exact path={'/projects/create/'}
                                               component={() => {
                                                   if (!this.isAuthenticated()) return <Redirect to={'/login/'}/>;
                                                   return <ProjectForm
                                                       projectCreate={(name, repository, users) =>
                                                           this.projectCreate(name, repository, users)}
                                                       users={this.state.users}/>
                                               }}/>

                                        <Route exact path={'/project/:id/'}
                                               component={() => <ProjectUsersList projects={this.state.projects}/>}/>


                                        <Route exact path={'/todos/'}
                                               component={() => <ToDoList
                                                   ToDos={this.state.todos}
                                                   ToDoDelete={(id) => this.ToDoDelete(id)}/>}/>

                                        <Route exact path={'/todos/create/'}
                                               component={() => {
                                                   if (!this.isAuthenticated()) return <Redirect to={'/login/'}/>;
                                                   return <ToDoForm
                                                       toDoCreate={(text, project, author, is_active) =>
                                                           this.toDoCreate(text, project, author, is_active)}
                                                       project={this.state.projects}
                                                       author={this.state.users}/>
                                               }}/>

                                        <Route exact path={'/todos/:id/'}
                                               component={() => <ToDoList ToDos={this.state.todos}/>}/>


                                        <Route component={pageNotFound404}/>
                                    </Switch>
                                </div>
                            </div>


                        </BrowserRouter>
                    </HashRouter>
                </div>
                <div className='footer'>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default App;