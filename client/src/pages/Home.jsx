import React from 'react';
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'
import { Container } from 'react-bootstrap';
import '../styles/Home.css'

const Home = () => {
    return (
        <div className="home" >
            <Header/>
            <h2>Samuel David Villegas Bedoya</h2>
            <div className="text-center mt-2 mx-auto my-5 p-5 bosy w-75 contenedorHome">
            </div>
            <Footer/>        
        </div>
    )
}

export default Home;