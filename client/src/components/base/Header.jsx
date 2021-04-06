import React from 'react';
import '../../styles/Header.css';
import { Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="/"><img src="../../public/logo.svg" alt="logo" /></Navbar.Brand>
                <Navbar.Text class="titleLogo"><h1>G-Cosmetics</h1></Navbar.Text>
            </Navbar>
        </div>
    )
}

export default Header;