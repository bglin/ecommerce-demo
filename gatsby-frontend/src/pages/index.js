import React, { useEffect,useState,useContext} from 'react';
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Button,Container,Alert,Figure,Row,Col, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalContext} from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IndexPage() {
  const {cart,getCart,setCart,products,getProducts} = useContext(GlobalContext);
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

  function handleClear() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}};

    fetch('api/v0/cart/clear',requestOptions).then(res => res.json()).then(data => {
    setCart(data.items)}
    );
  };


  return(
    <Layout>
      <SEO title="Home" />

      <Alert show = {alert} variant='success'>Item added to cart
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlert(false)} variant="outline-success">
            Close
            </Button>
            </div>
     </Alert>
      <Link to="/modal-cart" state={{modal:true}}><h2>Cart</h2></Link>

      <h3>Cart Count: {cart.length}</h3>
      <Button variant="danger" onClick={handleClear}>Clear Cart</Button>{' '}

      <h2 style={{ textAlign: `center`, minHeight: `10vh`}}>Product Catalog</h2>
      <Row>
      {products.map((data,idx) => (
      <Col md={4}>
       <Container key={idx} className="content">
       <Figure>
       <Figure.Image
              width={151}
              height={160}
              alt="171x180"
              src={data.image_url}
              rounded
            />
            <Figure.Caption>
            <h4>
              {data.name}
            </h4>
            </Figure.Caption>
         <Button variant="primary" onClick={() => addToCart(data)}>Add to Cart</Button>
       </Figure>
        {/* <h3>{data.product_id} : {data.name} <Button variant="primary" onClick={() => addToCart(data)}>Add to Cart</Button>{' '}</h3>*/}
    </Container>
      </Col>
      ))}
      </Row>

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <Link to="/admin-dashboard/">Admin Dashboard - Bruno </Link>
      <br />
      <Link to="/cart/">Go to cart 2</Link>
    </Layout>
)
}

export default IndexPage
