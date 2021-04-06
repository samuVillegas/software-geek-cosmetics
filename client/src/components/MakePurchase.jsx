import React from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import '../styles/MakePurchase.css'

const MakePurchase = () => {
    return (
        <div className="makePurchase" >
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy ">
                <Row>
                    <Col sm={5}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">
                        <Form>
                            <Form.Group>
                                <Form.Label>Orden #1</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha: 06/04/2020</Form.Label>{' '}
                                <Form.Label>Hora: 08:02</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Subtotal: 807288</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="inputMake">
                                <Form.Control type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Control as="select" className="inputMake">
                                            <option>Articulo1</option>
                                            <option>Articulo2</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Cantidad" className="inputMake"/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button className="buttonMake">
                                Agregar
                            </Button>
                        </Form>
                    </div> </Col>
                    <Col sm={7}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">
                        <Table striped bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Articulo</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Borrar ítem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Articulo1</td>
                                    <td>2</td>
                                    <td>$270000</td>
                                    <td><Button className="buttonMake">Borrar</Button></td>
                                </tr>
                                <tr>
                                    <td>Articulo2</td>
                                    <td>2</td>
                                    <td>$270000</td>
                                    <td><Button className="buttonMake">Borrar</Button></td>
                                </tr>
                                <tr>
                                    <td>Articulo3</td>
                                    <td>2</td>
                                    <td>$270000</td>
                                    <td><Button className="buttonMake">Borrar</Button></td>
                                </tr>
                                <tr>
                                    <td>Articulo3</td>
                                    <td>2</td>
                                    <td>$270000</td>
                                    <td><Button className="buttonMake">Borrar</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>$894000</td>
                                </tr>
                                <tr>
                                    <td>Total IVA:</td>
                                    <td>$169860</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>$1063860</td>
                                </tr>
                            </tbody>

                        </Table>

                    </div></Col>
                </Row>
            </Container>

        </div>
    )
}

export default MakePurchase;