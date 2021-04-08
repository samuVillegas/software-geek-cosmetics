import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Button, Form,Table } from 'react-bootstrap';
import '../styles/ShowOrders.css'

const ShowSales = () => {
    const[listSales,setListSales] = useState([]);

    useEffect(() => {
        convertSalesJson();
    }, []);

    async function convertSalesJson(){
        await fetch('http://localhost:8085/api/getSales',{method:'GET',mode:'cors'})
        .then(response=>{
            return response.json();
        }).then(response=>{
            setListSales(response.message);
        })
    }

    return (
        <div className="showOrders" >
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy containerShow">
                <Row>
                    <Col>
                        <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>#Orden</th>
                                        <th>SubTotal</th>
                                        <th>TotalIVA</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                    <tbody>{listSales.map((item)=>(
                                        <tr>
                                            <td>{item.NumberSale}</td>
                                            <td>{item.SubTotal}</td>
                                            <td>{item.TotalIVA}</td>
                                            <td>{item.Total}</td>
                                        </tr>
                                    ))}     
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ShowSales;