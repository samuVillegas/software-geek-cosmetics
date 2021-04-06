import React from 'react';
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'
import { Container,Row,Col,Button} from 'react-bootstrap';
import MakePurchase from '../components/MakePurchase'
import '../styles/Home.css'

const Home = () => {
    return (
        <div className="home" >
            <Header/>
            <h2>Samuel David Villegas Bedoya</h2>
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy">
                <Row>
                    <Col></Col>
                    <Col><Button className="buttonHome">Realizar compra</Button>{' '}</Col>
                    <Col><Button className="buttonHome">Total compras</Button>{' '}</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                    <MakePurchase/>
                    </Col>
                
                </Row>
            </Container>
            
            <Footer/>        
        </div>
    )
}

export default Home;