import React from "react";
import {Link} from "react-router-dom";
import logo_menu from '../logo_menu.png';

const Menu = () => {
    return (
        <div>
            <ul>
                <li className={'logo_menu'}>
                    <Link to={'/'}>
                        <img src={logo_menu} alt={'logo_menu'}/>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>Users</Link>
                </li>
                <li>
                    <Link to={'/projects/'}>Projects</Link>
                </li>
                <li>
                    <Link to={'/todos/'}>ToDos</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
