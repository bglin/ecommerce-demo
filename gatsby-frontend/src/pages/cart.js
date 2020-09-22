import React, {useState,useContext} from 'react';
import { Link } from 'gatsby';
import { Button,Container,Alert,Table,ButtonGroup,Card,Figure,Row,Col} from "react-bootstrap";
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';
import {GlobalContext} from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function Cart() {
  const [alert,setAlert] = useState(false);
  const {cart,setCart} = useContext(GlobalContext);

  function handleClick() {
    console.log('The link was clicked.')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product_id: 'BGB-US-001', quantity: 1,unit_price:15.25 })
    };
    fetch('api/v0/cart/add', requestOptions).then(res => res.json()).then(data => {
    setCart(data.items);
    setAlert(true);}
    );
  };

  function handleClear() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}};

    fetch('api/v0/cart/clear',requestOptions).then(res => res.json()).then(data => {
    setCart(data.items)}
    );
  };

  function incrementItem(id) {
    console.log(id)

    const requestOptions = {
        method: 'PUT'
      };

    fetch(`api/v0/cart/update/${id}?action=add`,requestOptions).then(res => res.json()).then(data => {
    setCart(data.items)}
    );
  };

  function decrementItem(id) {
    const requestOptions = {
        method: 'PUT'
      };

    fetch(`api/v0/cart/update/${id}?action=subtract`,requestOptions).then(res => res.json()).then(data => {
    setCart(data.items)}
    );
  };

  function deleteItem(id) {
    const requestOptions = {
        method: 'DELETE'
      };

    fetch(`api/v0/cart/delete/${id}`,requestOptions).then(res => res.json()).then(data => {
    setCart(data.items)}
    );
  };

  function calcTotal() {
    const subtotal = cart.map(item => item.unit_price*item.quantity);
    return subtotal.reduce((a,b) => a+b, 0)
  };

  return (
      <div>
      <h1>
      Shopping Cart
      </h1>
      <Container className='test'>
      <Card>
      <Card.Header><b>Items</b></Card.Header>
      <br />
      <Container>
       <Table className="table">
          <thead>
           <tr>
              <th></th>
               <th>Product</th>
               <th>Unit Price</th>
               <th>Quantity</th>
               <th>Line Total</th>
               <th></th>
           </tr>
           </thead>
           <tbody>
           {cart.map((cart, idx) => (
               <tr
               key={idx}>
                  <td>
                  <Figure>
                        <Figure.Image
                          width={50}
                          height={50}
                          alt="50x50"
                          src={cart.image_url}
                        />
                  </Figure>
                  </td>
                   <td>{cart.name}</td>
                   <td>${cart.unit_price}</td>
                   <td>
                   <ButtonGroup>
                      <Button variant="dark" size="sm" onClick={() => incrementItem(cart.product_id)}>+</Button>
                      <Button variant="light"><h4>{cart.quantity}</h4></Button>
                      {cart.quantity > 1 ?
                        <Button variant="dark" size="sm" onClick={() => decrementItem(cart.product_id)}>-</Button> : <Button variant="dark" size="sm" disabled>-</Button>}
                  </ButtonGroup>
                  </td>
                   <td>${cart.quantity*cart.unit_price}</td>
                   <td><Button variant="danger" size="sm" onClick={() => deleteItem(cart.product_id)}><FontAwesomeIcon icon={"trash-alt"} size="lg" style={{color:"#FFFAFA"}}/></Button></td>
               </tr>
             ))}
           </tbody>
       </Table>
       </Container>
       <Container>
       <Row>
       <Col></Col>
       <Col></Col>
       <Col></Col>
       <Col>
       <h2>Total:$ {calcTotal()}</h2>
       </Col>

       </Row>
       </Container>
        <Card.Footer className="text-right"><Button variant='primary'>Checkout</Button></Card.Footer>
       </Card>
       </Container>
    </div>
  )
}

export default Cart
