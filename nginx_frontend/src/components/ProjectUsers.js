import React from "react";
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}/`}>
                    {project.name}
                </Link>
            </td>
            <td>{project.users}</td>
            <td>{project.repository}</td>
        </tr>
    )
}

const ProjectUsersList = ({projects}) => {
    let {id} = useParams();
    let filteredProjects = projects.filter((project) => project.id === +id)
    return (
        <table>
            <thead>
            <tr>
                <th>Name Project</th>
                <th>Users</th>
                <th>Repository</th>
            </tr>
            </thead>
            <tbody>
            {filteredProjects.map((project) => <ProjectItem key={project.name} project={project}/>)}
            </tbody>
        </table>
    )
}


export default ProjectUsersList;
