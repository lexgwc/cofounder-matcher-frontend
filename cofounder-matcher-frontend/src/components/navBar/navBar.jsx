import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        return setIsOpen(!isOpen)
    }

    return (
        <nav className="navbar">
            <div className="hamburger" onClick={handleClick}>
                &#9776; 
            </div>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
                <NavLink className="nav-link" to="/my-profile" onClick={handleClick}>My Profile</NavLink>
                <NavLink className="nav-link" to="/profile-search" onClick={handleClick}>Search Profiles</NavLink>
                <NavLink className="nav-link" to="/conversations" onClick={handleClick}>Inbox</NavLink>
                <NavLink className="nav-link" to="/favorites" onClick={handleClick}>Favorites</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;

