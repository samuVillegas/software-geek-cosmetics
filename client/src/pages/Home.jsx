import React ,{useEffect,useState}from 'react';
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'
import { Container,Row,Col,Button} from 'react-bootstrap';
import MakePurchase from '../components/MakePurchase'
import ShowSales from '../components/ShowSales';
import '../styles/Home.css';
import {getEndPoint} from '../functions/functions';



const Home = () => {
    const[option,setOption] = useState(0);
    useEffect(() => {
        console.log(getEndPoint())
       saveProducts();
    }, []);

    const saveProducts = async()=>{
        await fetch(`${getEndPoint()}saveProducts`,{method:'GET',mode:'cors'})
        .then(response=>{
            return response.json();
        }).then(response=>{
            if(response.message!=='PRODUCTS_STORED_CORRECTLY')  alert('SERVER_ERROR');
        })
    }
    
    return (
        <div className="home" >
            <Header/>
            <h2>Samuel David Villegas Bedoya</h2>
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy">
                <Row>
                    <Col></Col>
                    <Col><Button className="buttonHome" onClick={()=>{setOption(1)}}>Realizar compra</Button>{' '}</Col>
                    <Col><Button className="buttonHome"onClick={()=>{setOption(2)}}>Total compras</Button>{' '}</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                    {option===0?<h1>Home</h1>:option===1?<MakePurchase/>:<ShowSales/>
                    }
                    </Col>
                </Row>
            </Container>
            
            <Footer/>        
        </div>
    )
}

export default Home;