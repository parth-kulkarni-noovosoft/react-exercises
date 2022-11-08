import useProducts from "../hooks/useProducts";
import React from "react";
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from "../types";
import ProductList from "../components/ProductList/ProductList";

const Cart: React.FC = () => {
  const { cart, properties } = useOutletContext<IOutletContext>();
  const productsInCart = useProducts(cart.getProductIDs());

  const filteredProducts = productsInCart.filter(product => {
    const matchesQuery = product.title.toLowerCase().includes(properties.query.toLowerCase())
    const matchesCategory = properties.category === 'All' || properties.category === product.category
    return matchesCategory && matchesQuery;
  })

  return (
    <ProductList
      addProductToCart={() => { /* Does nothing */ }}
      removeProductFromCart={cart.removeProduct}
      isAlreadyAdded={(_id) => true}
      products={filteredProducts}
    />
  )
}

export default Cart;