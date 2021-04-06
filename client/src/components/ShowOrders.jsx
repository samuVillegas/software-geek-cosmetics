import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../styles/MakePurchase.css'

const ShowOrders = () => {
    return (
        <div className="makePurchase" >
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy ">
                <Row>
                    <Col sm={8}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
    </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </Form>
                    </div> </Col>
                    <Col sm={5}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">


                    </div></Col>
                </Row>
            </Container>

        </div>
    )
}

export default ShowOrders;