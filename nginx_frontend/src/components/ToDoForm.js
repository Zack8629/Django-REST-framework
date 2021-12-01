import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            project: 1,
            author: 1,
            is_active: true,
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log('handlerOnChange->', event.target.name, event.target.value)
    }

    handlerOnSubmit(event) {
        event.preventDefault();
        this.props.toDoCreate(
            this.state.text,
            this.state.project,
            this.state.author,
            this.state.is_active,
        )
    }

    render() {
        return (
            <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                <input type='text' name='text'
                       value={this.state.text}
                       onChange={(event) => this.handlerOnChange(event)}/>

                <select name='project'
                        onChange={(event) => this.handlerOnChange(event)}>
                    {this.props.project.map((project) => (
                        <option value={[project.id]} key={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <select name='author'
                        onChange={(event) => this.handlerOnChange(event)}>
                    {this.props.author.map((user) => (
                        <option value={[user.id]} key={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>

                {/*<input type='checkbox' name='is_active'*/}
                {/*       value={this.state.is_active}*/}
                {/*       onChange={(event) => this.handlerOnChange(event)}/>*/}

                <input type='submit' value='Create'/>
            </form>
        )
    }
}

export default ToDoForm;