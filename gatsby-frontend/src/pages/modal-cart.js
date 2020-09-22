import React, {useState,useContext} from 'react';
import { Link } from 'gatsby';
import { Button,Container,Alert,Table,ButtonGroup,Card,Figure,Row,Col} from "react-bootstrap";
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';
import {GlobalContext} from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'


function ModalCart() {
  const [alert,setAlert] = useState(false);
  const {cart,setCart} = useContext(GlobalContext);

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

  function checkoutCart() {
    const requestOptions = {
        method: 'POST'
      };

    fetch('api/v0/cart/checkout',requestOptions).then(res => res.json()).then(data => {
    setCart(data.cart.items)}
    );
  };

  function calcTotal() {
    const subtotal = cart.map(item => item.unit_price*item.quantity);
    return subtotal.reduce((a,b) => a+b, 0).toFixed(2)
  };


  return (
      <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) => (
          <div>
            {modal ? (
              <Link to={closeTo}>
                Close
              </Link>
            ) : (
              <header>
                <h1>
                  Website Title
                </h1>
              </header>
            )}

        <h2>Cart</h2>

        <Alert show = {alert} variant='success'>Item added to cart
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
       </Alert>

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
                       <th>Sub Total</th>
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
          <Card.Footer className="text-right">{cart.length >0 ? <Button variant='primary' onClick={checkoutCart}>Checkout</Button> : <Button variant='primary' disabled>Checkout</Button>}</Card.Footer>
         </Card>
       </Container>

       </div>
        )}
      </ModalRoutingContext.Consumer>
  )
}

export default ModalCart
