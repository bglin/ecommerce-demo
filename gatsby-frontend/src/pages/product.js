import React, { useEffect,useState,useContext} from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Button,Alert,Figure,Container,Row,Col,Badge} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalContext} from "../context/GlobalContext";

function ProductPage({location}) {
  const {cart,getCart,setCart,getProducts} = useContext(GlobalContext);
  const [alert,setAlert] = useState(false);


  useEffect(() => {
    console.log('use effect invoked index')
    getCart()
    getProducts()
  },[getCart,getProducts]);


  function addToCart(item) {
    console.log('The link was clicked.')

    fetch('api/v0/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({product_id: item.product_id,name:item.name, quantity: 1,unit_price:item.unit_price,image_url:item.image_url})
    }).then(response => {
      if (!response.ok) {
             // create error object and reject if not a 2xx response code
             var err = new Error("HTTP status code: " + response.statusText);
             err.response = response;
             err.status = response.status;
             throw err;
         }
      return response
    }).then(response =>response.json()).then(data => {
    setCart(data.items);
    setAlert(true);
    }).catch((error) => {
      console.log('Error',error);
       });
  };

  return(
    <Layout>
      <SEO title="Product" />

      <Alert show = {alert} variant='success'>Item added to cart
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <h3>Cart Count: {cart.length}</h3>
      <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Row>
        <Col>
          <Figure>
          <Figure.Image
                 width={300}
                 height={310}
                 alt="171x180"
                 src={location.state.product.image_url}
                 rounded
               />
          </Figure>
        </Col>
        <Col>
          <Row>
            <h2 style={{ textAlign: `center`, minHeight: `10vh`}}>
              {location.state.product.name}
              &nbsp;
              <Badge pill variant="success">${location.state.product.unit_price}</Badge>
              </h2>
            <h4>{location.state.product.description}</h4>
          </Row>

          <Row>
          <Button variant="primary" onClick={() => addToCart(location.state.product)}>Add to Cart</Button>
          </Row>
        </Col>
      </Row>
      </Container>
    </Layout>
)
}

export default ProductPage
