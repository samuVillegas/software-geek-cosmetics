import React from 'react';
import '../../styles/Header.css';
import { Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="/"><img src="https://github.com/samuVillegas/software-geek-cosmetics/blob/main/client/public/logo.svg?raw=true" alt="logo" /></Navbar.Brand>
                <Navbar.Text ><h1 className="titleLogo">G-Cosmetics</h1></Navbar.Text>
            </Navbar>
        </div>
    )
}

export default Header;