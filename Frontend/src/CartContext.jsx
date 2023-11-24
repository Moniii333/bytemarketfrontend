import { createContext, useEffect, useState } from 'react';
import { getProductID } from './apiCalls/utils';

export const CartContext = createContext({
  products: [],
  getProductQuantity: () => {},
  addProductToCart: () => {},
  removeOneProductFromCart: () => {},
  deleteFromCart: () => {},
  totalCartCost: () => {},
});


export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart')) || [])

  // for persistent cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts) || '[]')
  }, [cartProducts])

  

  function getProductQuantity(id) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    } else {
      return quantity;
    }
  }

  async function addProductToCart(id) {
    const quantity = await getProductQuantity(id);
    const item = await getProductID(id)
    
    if (quantity === 0) {
      //no products in cart
      setCartProducts([
        ...cartProducts,
        {
          id: item.data.id,
          quantity: 1,
          name: item.data.name,
          price: item.data.price,
        },
      ]);
    } else {
      //product is in cart, find matching id +1 to it
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneProductFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      //find matching id remove 1 from it
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    // filters thru current cart for a matching id then removes if id matches
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  async function totalCartCost() {
    let cartCost = 0;
    for (const cartItem of cartProducts) {
      const productData = await getProductID(cartItem.id);
      cartCost += productData.data.price * cartItem.quantity;
    }
    return cartCost.toFixed(2);
  }
  

  const contextValue = {
    products: cartProducts,
    getProductQuantity,
    addProductToCart,
    removeOneProductFromCart,
    deleteFromCart,
    totalCartCost,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
