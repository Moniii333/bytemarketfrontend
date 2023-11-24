import { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from "../CartContext"
import CartDetails from './CartDetails';
import Checkout from './Checkout';

export default function Cart() {
  const cart = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const productCount = cart.products.reduce((sum, item) => sum + item.quantity, 0)

  const [cartTotal, setCartTotal] = useState(null)
  useEffect(() => {
    const updateCart = async () => {
      const total = await cart.totalCartCost()
      setCartTotal(total)
    }
    updateCart()
  }, [productCount])

  return (
    <>
      <Button variant='primary' onClick={() => openCart()}>
        Cart ({productCount} items)
      </Button>
      <Modal show={isCartOpen} onHide={closeCart}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productCount > 0 ? 
            <>
              <p><em>Current items in cart:</em></p>
              {cart.products.map((currentProduct, i) => (
                <span key={i}>
                  <CartDetails key={i} id={currentProduct.id} quantity={currentProduct.quantity} ></CartDetails>
                </span>
              ))}
              <h2>Total: ${cartTotal !== null ? cartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}</h2>
              <form action='/create-checkout-session' method='POST'>
                <p><em>Taxes may be added during payment</em></p>
              <Checkout />
              </form>
            </>
          :
            <h1>Your cart is empty!</h1>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}