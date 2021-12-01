import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, projectDelete}) => {
    return (
        <tr>
            <td>
                {project.users}
            </td>
            <td>
                <Link to={`/project/${project.id}/`}>
                    {project.name}
                </Link>
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                <button onClick={() => projectDelete(project.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects, projectDelete}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Name Project</th>
                    <th>Repository</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem key={project.id}
                                                        project={project}
                                                        projectDelete={projectDelete}/>)}
                </tbody>
            </table>
            <Link to="/projects/create/">New project!</Link>
        </div>
    )
}

export default ProjectsList;
