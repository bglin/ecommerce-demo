import React, { useEffect,useState,useContext} from 'react';
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ProductCatalog from "../components/catalog"
import {Button,Alert} from "react-bootstrap";
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

      <h3>Cart Count: {cart.length}</h3>
      <h2 style={{ textAlign: `center`, minHeight: `10vh`}}>Product Catalog</h2>
      <ProductCatalog products={products} addToCart={addToCart}/>
      {/*<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> <Image/> </div>*/}
      <br />
    </Layout>
)
}

export default IndexPage
