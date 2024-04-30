import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import { DropdownMenu, Button } from '@radix-ui/themes'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(false);
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
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}


export default Navbar;



// V3 ---> LATEST AND BEST

// const Navbar = () => {

//     const [isOpen, setIsOpen] = useState(false);

//     const handleClick = () => {
//         setIsOpen(false);
//     }

//     return (
//         <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
//         <DropdownMenu.Trigger asChild>
//             <Button className="dropdown-trigger">
//                 Menu &#9776;
//             </Button>
//         </DropdownMenu.Trigger>
//         <DropdownMenu.Content>
//                 <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
//                 <NavLink className="nav-link" to="/my-profile" onClick={handleClick}>My Profile</NavLink>
//                 <NavLink className="nav-link" to="/profile-search" onClick={handleClick}>Search Profiles</NavLink>
//                 <NavLink className="nav-link" to="/conversations" onClick={handleClick}>Inbox</NavLink>
//                 <NavLink className="nav-link" to="/favorites" onClick={handleClick}>Favorites</NavLink>
//         </DropdownMenu.Content>
//     </DropdownMenu.Root>
//     )
// }



