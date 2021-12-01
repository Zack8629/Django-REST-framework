import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repository: '',
            users: [1]
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        event.preventDefault();
        this.props.projectCreate(
            this.state.name,
            this.state.repository,
            this.state.users
        )
    }

    render() {
        return (
            <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                <input type='text' name='name'
                       value={this.state.name}
                       onChange={(event) => this.handlerOnChange(event)}/>

                <input type='text' name='repository'
                       value={this.state.repository}
                       onChange={(event) => this.handlerOnChange(event)}/>

                <select name='users'
                        onChange={(event) => this.handlerOnChange(event)}>
                    {this.props.users.map((user) => (
                        <option value={[user.id]} key={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <input type='submit' value='Create!'/>
            </form>
        )
    }
}

export default ProjectForm;