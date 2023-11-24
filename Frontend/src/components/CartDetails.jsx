import { Button, Form, Col, Row } from "react-bootstrap"
import { CartContext } from "../CartContext"
import { useContext, useEffect, useState } from "react"
import { getProductID } from "../apiCalls/utils"

export default function CartDetails(props) {
  const [productInfo, setProductInfo] = useState([])
  const cart = useContext(CartContext)
  const id = props.id
  const quantity = props.quantity
  const getDetails = async () => {
    const data = await getProductID(id)
    if(data){
      setProductInfo(data.data)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return(
    <>
      <div div id="checkoutmenu">
      <h3>{productInfo.name}</h3>
      <img id='checkoutpic' src={productInfo.imgurl} />
      </div>
      <p>$ { (quantity * productInfo.price).toFixed(2) }</p>
      <Form as={Row}>
        <Form.Label column='true' sm='6'>In cart: {quantity}</Form.Label>
        <Col sm='6'>
        <div id="quantityBtns">
        <Button sm='6' onClick={() => cart.removeOneProductFromCart(id)} className="mx-2">-</Button>
        <p id="quantityNmb">{quantity}</p>
        <Button sm='6' onClick={() => cart.addProductToCart(id)} className="mx-2">+</Button>
        </div>
        </Col>
      </Form>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
      <hr></hr>
    </>
  )
}