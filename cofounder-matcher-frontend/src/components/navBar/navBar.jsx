import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import { DropdownMenu, Button } from '@radix-ui/themes'
import { removeToken } from '../../services/tokenServices';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        setIsOpen(false);
    }

    const logOut = () => {
        removeToken()
        navigate('/login')
    }

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
                <Button className="dropdown-trigger">Menu &#9776;</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="dropdown-content">
                {['/', '/my-profile', '/profile-search', '/conversations', '/favorites'].map((path, index) => (
                    <DropdownMenu.Item key={index} className="dropdown-menu-item">
                        <NavLink to={path} className="nav-link" onClick={handleClick}>
                            {path === '/' ? 'Home' :
                            path === '/my-profile' ? 'My Profile' :
                            path === '/profile-search' ? 'Search Profiles' :
                            path === '/conversations' ? 'Inbox' :
                            path === '/favorites' ? 'Favorites' :
                            'Home'}
                        </NavLink>
                    </DropdownMenu.Item>
                ))}
                <Button className='logout' onClick={logOut}>Log Out</Button>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}


export default Navbar;