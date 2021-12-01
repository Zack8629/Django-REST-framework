import React from "react";
import {Link} from "react-router-dom";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`/user/${user.id}/`}>
                    {user.id}
                </Link>
            </td>
            <td>
                <Link to={`/user/${user.id}/`}>
                    {user.first_name}
                </Link>
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>First_name</th>
                <th>Last_name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => <UserItem key={user.username} user={user}/>)}
            </tbody>
        </table>
    )
}


export default UsersList;
