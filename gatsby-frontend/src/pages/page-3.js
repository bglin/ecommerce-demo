import React, { useEffect,useContext} from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import {GlobalContext} from "../context/GlobalContext"

function PageThree() {
  const {cart,getCart} = useContext(GlobalContext);

  useEffect(() => {
    console.log('use effect invoked index')
    getCart()
  },[getCart]);

  return(
    <Layout>
      <SEO title="PageThree" />
      <h1>Page 3</h1>
      <h2>Cart Count: {cart.length}</h2>
    </Layout>
)
}

export default PageThree
