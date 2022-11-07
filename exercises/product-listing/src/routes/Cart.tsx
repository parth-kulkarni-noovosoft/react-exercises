import useProducts from "../hooks/useProducts";
import React, { useContext } from "react";
import { Link, useOutletContext } from 'react-router-dom';
import UserContext from "../context/user";
import { IOutletContext } from "../types";
import ProductList from "../components/ProductList/ProductList";

const Cart: React.FC = () => {
  const { cart, properties } = useOutletContext<IOutletContext>();
  const productsInCart = useProducts(cart.getProductIDs());
  const { userInfo } = useContext(UserContext);

  const filteredProducts = productsInCart.filter(product => {
    const matchesQuery = product.title.toLowerCase().includes(properties.query.toLowerCase())
    const matchesCategory = properties.category === 'All' || properties.category === product.category
    return matchesCategory && matchesQuery;
  })

  return (
    <div>
      <div className="title-container">
        <span className="cart-title bordered">{userInfo?.firstName ?? 'default'}&apos;s Cart</span>
        <Link to='/' className='link bordered'>
          <span>Home</span>
        </Link>
      </div>
      <ProductList
        addProductToCart={() => { /* Does nothing */ }}
        removeProductFromCart={cart.removeProduct}
        isAlreadyAdded={(_id) => true}
        products={filteredProducts}
      />
    </div>
  )
}

export default Cart;