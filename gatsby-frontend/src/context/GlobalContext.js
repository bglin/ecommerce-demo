import React, { useState, useCallback } from "react"


export const GlobalContext = React.createContext();


const GlobalContextProvider = ({children}) => {
  const [cart,setCart] = useState([]);
  const [products,setProduct] = useState([]);

//https://stackoverflow.com/questions/57294549/react-hook-usecallback-without-dependencies
  const getCart = useCallback(() => {
    let mounted = true;
    fetch('/api/v0/cart/').then(res => res.json()).then(data => {
      if (mounted) {
        setCart(data.items);
      }
    });
    return () => {
      mounted = false;
    };
  },[]);


  const getProducts = useCallback(() => {
    let mounted = true;
    fetch('/api/v0/products/').then(res => res.json()).then(data => {
      if (mounted) {
        setProduct(data);
      }
    });
    return () => {
      mounted = false;
    };
  },[]);

  const globalState = {
    cart,
    setCart,
    getCart,
    products,
    setProduct,
    getProducts
  }
  return (
    <GlobalContext.Provider value = {globalState}>
    {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
