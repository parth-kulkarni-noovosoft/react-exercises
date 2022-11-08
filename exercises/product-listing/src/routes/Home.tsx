import React from "react";
import { useOutletContext } from "react-router-dom";
import { Routes } from "../constants";
import useFetch from "../hooks/useFetch";
import { IOutletContext, ProductsResponse } from "../types";
import ProductList from "../components/ProductList/ProductList";

const App: React.FC = () => {
  const { properties, cart } = useOutletContext<IOutletContext>();

  const productsResponse = useFetch<ProductsResponse>(Routes.productSearch(properties.query));
  const filteredProducts = productsResponse?.products?.filter(product => {
    if (properties.category === 'All') return true;
    else return product.category === properties.category
  }) ?? [];

  return (
    <ProductList
      addProductToCart={cart.addProduct}
      removeProductFromCart={cart.removeProduct}
      isAlreadyAdded={(id: number) => cart.getProductIDs().includes(id)}
      products={filteredProducts}
    />
  )
}
export default App
