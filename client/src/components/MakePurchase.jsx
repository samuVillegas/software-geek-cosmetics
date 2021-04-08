import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import '../styles/MakePurchase.css'
import {generatorDate} from '../functions/functions'
import {getEndPoint} from '../functions/functions';
const MakePurchase = () => {
    const [listProducts,setListProducts] = useState([]);
    const [listProductsClient, setListProductsClient] = useState([]);
    const [objProductsClient, setObjProductsClient] = useState({})
    const [productsSetClient, setProductsSetClient] = useState(new Set());
    const [existenceProduct,setExistenceProduct] = useState(0);
    const [priceProduct,setPriceProduct] = useState(0)
    const [cantProducts, setCantProducts] = useState(0);
    const [subTotalProduct,setSubTotalProduct] = useState(0);
    const [subTotalAllProducts,setSubTotalAllProducts] = useState(0);
    const [totalIVA,setTotalIVA] = useState(0);
    const [total,setTotal] = useState(0);
    const [date,setDate] = useState('');
    const [numberSale,setNumberSale] = useState(0); 


    useEffect(() => {
        convertProductsJson();
        setInterval(()=>{
            setDate(generatorDate());
        },60)
        setNumberSale(Math.floor(Math.random()*999999)+1)
    }, []);
    
    const convertProductsJson = async()=>{
        await fetch(`${getEndPoint()}getProducts`,{method:'GET',mode:'cors'})
        .then(response=>{
            return response.json();
        }).then(response=>{
            setListProducts(Object.values(response.message));
        })
    }
    

    const addProduct = () => {
        const nameUser = document.getElementById('nameUserAdd');

        if (nameUser.value !== '') {

            const name = document.getElementById('productAdd').value;

            if (name !== 'Articulo' && !productsSetClient.has(name)) {

                const quantity = parseInt(document.getElementById('quantityAdd').value);
                
                if (!isNaN(quantity)) {
                    if(quantity<=existenceProduct){
                        //Evita que el usuario coloque otro nombre diferente
                        nameUser.disabled = true;

                        //Realizamos las operaciones para el subtotal general (suma)
                        operations(subTotalProduct,true);

                        //Formamos el objeto para agregarlo a la lista de productos del cliente
                        const objProductsClientAux = objProductsClient;
                        objProductsClientAux[`'${cantProducts}'`] = { id: cantProducts, name: name, quantity: quantity, subTotal: subTotalProduct }
                        setObjProductsClient(objProductsClientAux);

                        //Agregamos el nombre del producto al set para luego comprobar si ya se ha elegido. 
                        const productsSetClientAux = productsSetClient;
                        productsSetClient.add(name)
                        setProductsSetClient(productsSetClientAux)

                        //Agregamos el objeto a la lista de productos del cliente
                        setListProductsClient(listProductsClient => [...listProductsClient, objProductsClientAux[`'${cantProducts}'`]])
                        setCantProducts(cantProducts + 1);

                        //Reseteo de formulario (El nombre no lo hace)
                        document.getElementById('productAdd').value = 'Articulo';
                        document.getElementById('quantityAdd').value = '';
                        setExistenceProduct(0);
                        setPriceProduct(0);
                        setSubTotalProduct(0);

                    }else{
                        alert('La cantidad pedida del producto excede a las existencias');
                    } 
                } else {
                    alert('La cantidad debe ser un número entero');
                }
            } else {
                alert('Selecciona un producto y/o un producto no repetido');
            }
        } else {
            alert('Ingrese el nombre de usuario');
        }

    }

    const deleteProduct = (id, name,subTotal) => {
        const objProductsClientAux = objProductsClient;
        delete objProductsClientAux[`'${id}'`]
        const productsSetClientAux = productsSetClient;
        productsSetClient.delete(name);

        //Realizamos las operaciones para el subtotal general (resta)
        operations(subTotal,false);

        setProductsSetClient(productsSetClientAux)
        setObjProductsClient(objProductsClientAux);
        setListProductsClient(Object.values(objProductsClientAux));
    }

    const onChangeFields = (e) => {
        if(e.target.id === 'productAdd'){
            if(e.target.value!='Articulo'){
                const result = listProducts.filter(item=>item.descripcion === e.target.value);
                if(result.length!=0){
                    setExistenceProduct(parseInt(result[0].existencia));
                    setPriceProduct(result[0].precio);
                }else{
                    window.location.href = '/';
                }
            }else if(e.target.value=='Articulo'){
                setExistenceProduct(0);
                setPriceProduct(0);
                setSubTotalProduct(0);
            }
        }

        if(existenceProduct>0){     
            const name = document.getElementById('productAdd').value;
            const quantity = parseInt(document.getElementById('quantityAdd').value);
            if(!isNaN(quantity) && quantity!==0){
                setSubTotalProduct(quantity*parseInt(priceProduct));
            }else{  
                setSubTotalProduct(0);
            }
        }
    }

    const operations = (subTotalParam,type)=>{
        var subTotalAllProductsAux = 0;

        if(type)subTotalAllProductsAux=subTotalAllProducts+subTotalParam;
        else subTotalAllProductsAux=subTotalAllProducts-subTotalParam;

        setSubTotalAllProducts(subTotalAllProductsAux);
        const totalIVAAux = subTotalAllProductsAux*0.19
        setTotalIVA(totalIVAAux);
        const totalAux = totalIVAAux + subTotalAllProductsAux
        setTotal(totalAux);
    }   

    const sendSale = async () =>{

        if(total!==0){
            const dateAux = date.split(' ')[0].split('/');
            const timeAux = date.split(' ')[1].split(':');
            const data = {
                NumberSale:numberSale,
                SubTotal:subTotalAllProducts,
                TotalIVA:totalIVA,
                CreationDate:parseInt(dateAux[0]+dateAux[1]+dateAux[2]+timeAux[0]+timeAux[1]+'00'),
                NameUser:document.getElementById('nameUserAdd').value,
                Total:total
            }
            await fetch(`${getEndPoint()}createSale`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method:'POST',
                mode:'cors',
                body:JSON.stringify(data)
            })
            .then(response=>{
                return response.json();
            }).then(response=>{
                if(response.message==='SUCCESSFUL_CREATION_SALE'){
                    alert('SUCCESSFUL_CREATION_ORDER');
                    resetForm();
                }
                else if(response==='SERVER_ERROR')alert('SERVER_ERROR')
            })
        }else{
            alert('Ingrese almenos un producto')
        }
        
    }

    const resetForm= ()=>{
        document.getElementById('formAdd').reset();
        setListProductsClient([]);
        setObjProductsClient({});
        setProductsSetClient(new Set());
        setSubTotalAllProducts(0)
        setTotalIVA(0)
        setTotal(0)
        setNumberSale(Math.floor(Math.random()*999999)+1)
        document.getElementById('nameUserAdd').disabled = false;
    } 

    return (
        <div className="makePurchase" >
            <Container className="text-center mt-2 mx-auto my-1 p-5 bosy ">
                <Row>
                    <Col sm={6}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">
                        <Form id='formAdd'>
                            <Form.Group>
                                <Form.Label>Orden #{numberSale}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha: {date.split(' ')[0]}</Form.Label>{' '}
                                <Form.Label>Hora: {date.split(' ')[1]}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="subTotalAdd">Subtotal: ${subTotalProduct}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="inputMake" >
                                <Form.Control type="text" placeholder="Nombre" id="nameUserAdd" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Control as="select" className="inputMake" id="productAdd" onChange={onChangeFields}>
                                            <option>Articulo</option>
                                            {listProducts.map((product) => (
                                                <option>{product.descripcion}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Cantidad" className="inputMake" id="quantityAdd" onChange={onChangeFields} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label id="existAdd">Existencia: {existenceProduct}</Form.Label>{' \n'}
                                            <Form.Label id="existAdd">Precio: {priceProduct}</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form.Group>
                            <Button className="buttonMake" onClick={addProduct}>
                                Agregar
                            </Button>
                        </Form>
                    </div> </Col>
                    <Col sm={6}> <div className="text-center mt-1 mx-auto my-1 p-5 bosy w-100 containerMake">
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
                                {listProductsClient.map((element) => (
                                    <tr>
                                        <td>{element.name}</td>
                                        <td>{element.quantity}</td>
                                        <td>{element.subTotal}</td>
                                        <td><Button className="buttonMake" onClick={() => {
                                            deleteProduct(element.id, element.name,element.subTotal)
                                        }}>Borrar</Button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>${subTotalAllProducts}</td>
                                </tr>
                                <tr>
                                    <td>Total IVA:</td>
                                    <td>${totalIVA}</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>${total}</td>
                                </tr>
                            </tbody>

                        </Table>

                        <Button className="buttonMake" onClick={sendSale}>Finalizar</Button>
                    </div></Col>
                </Row>
            </Container>

        </div>
    )
}

export default MakePurchase;