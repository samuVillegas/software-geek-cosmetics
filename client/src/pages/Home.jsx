import React ,{useEffect,useState}from 'react';
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'
import { Container,Row,Col,Button} from 'react-bootstrap';
import MakePurchase from '../components/MakePurchase'
import '../styles/Home.css'



const Home = () => {
    const[listProducts,setListProducts] = useState([]);

    useEffect(() => {
        convertProductsJson();
    }, []);


    async function convertProductsJson(){
        await fetch('http://localhost:8085/api/getProducts',{method:'GET',mode:'cors'})
        .then(response=>{
            return response.json();
        }).then(response=>{
            setListProducts(Object.values(response));
        })
    }
    

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
                    <MakePurchase listProducts={listProducts} />
                    </Col>
                
                </Row>
            </Container>
            
            <Footer/>        
        </div>
    )
}

export default Home;