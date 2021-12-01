import React from "react";
import {Link} from "react-router-dom";


const ToDoItem = ({ToDo, ToDoDelete}) => {
    return (
        <tr>
            <td>
                {ToDo.author}
            </td>
            <td>
                {ToDo.project}
            </td>
            <td>
                {ToDo.text}
            </td>
            <td>
                <button onClick={() => ToDoDelete(ToDo.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const ToDoList = ({ToDos, ToDoDelete}) => {
    const filteredToDos = ToDos.filter((ToDo) => ToDo.is_active)
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Author</th>
                    <th>Project</th>
                    <th>To Do Text</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {filteredToDos.map((ToDo) => <ToDoItem key={ToDo.project}
                                                       ToDo={ToDo}
                                                       ToDoDelete={ToDoDelete}/>)}
                </tbody>
            </table>
            <Link to="/todos/create/">New To-Do!</Link>
        </div>
    )
}

export default ToDoList;
