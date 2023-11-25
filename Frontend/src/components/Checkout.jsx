import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from "../CartContext"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { completePurchase } from '../apiCalls/utils';


export default function Checkout() {
  const cart = useContext(CartContext)
  const items = cart.products.map(product => ({
    price_data: {
      currency: 'USD',
      unit_amount: product.price,
      product_data: {
        name: product.name,
      },
    },
    quantity: product.quantity,
  }))

  const handleCheckout = async () => {
    try{
      const res = await completePurchase(items)
      if(res){
        toast.success('Your purchase has been completed!')
        console.log('checkout success:', res)
      }
    }catch(error){
      console.warn('Checkout failed:', error)
      toast.warn('Your purchase could not be completed')
    }
  }
  return(
    <Button onClick={() => handleCheckout()}>Checkout</Button>
  )
}