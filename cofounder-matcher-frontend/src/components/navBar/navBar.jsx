import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import { DropdownMenu, Button, Flex } from '@radix-ui/themes'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(false);
    }

    return (
        <Flex gap="3" justify="end">
            <>
                <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenu.Trigger asChild>
                        <Button className="dropdown-trigger"> &#9776;</Button>
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
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </>
        </Flex>
    );
}


export default Navbar;