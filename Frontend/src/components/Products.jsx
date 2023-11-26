import { useState, useEffect } from "react"
import { getAllProducts } from "../apiCalls/utils"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { CartContext } from "../CartContext"
import { useContext } from "react"
import DeleteProduct from "./DeleteProduct"
import EditProduct from "./EditProduct"
import Spinner from 'react-bootstrap/Spinner'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams]  = useState("");

  const username = sessionStorage.getItem('username')

  useEffect(() => {
    const getProducts = async () => {
      try{
        const response = await getAllProducts()
        if(response) {
          setProducts(response)
          setLoading(false)
        }
      }catch(error){
        console.warn('Error on front end:', error)
      }
    }
    if(products.length === 0) {
      getProducts()
    }
  }, [products])

  // toggle product details
  const [toggleDetails, setToggleDetails] = useState(null)
  
  const productsToDisplay = searchParams
    ? products.filter((item) => {
        const itemInfo = `${item.name} ${item.id} ${item.price} ${item.description} ${item.category}`;
        return itemInfo.toLowerCase().includes(searchParams);
    })
  : products;

  // cart stuff
  const cart = useContext(CartContext)
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemId, setItemId] = useState(null)

  const handleAddToCart = (id) => {
    cart.addProductToCart(id)
    setItemId(id)
  }

  const productQuantity = cart.getProductQuantity(itemId)

  useEffect(() => {
    setItemQuantity(cart.getProductQuantity(itemId))
  }, [productQuantity])

  return(
    <div  className='app'>
      <div id="component">
      <h1>View our products!</h1>
      <div id="search">
        <input 
          id="search_box"
          type="text" 
          placeholder="Search Products" 
          onChange={(e) => setSearchParams(e.target.value.toLowerCase())}/>
      </div>
      <div id="products">
        {loading !== true ? (
        productsToDisplay.map((item) => (
          <div key={item.id} className="single-item">
            <p>{item.name}</p>
            <img id="product-img" src={item.imgurl}></img>
            <p><strong>Price:</strong> <span id="dollarSign">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
            <button data-id='data-item-id' onClick={() =>
              setToggleDetails(toggleDetails === item.id ? null : item.id)}>
              {toggleDetails === item.id ? 'View Less' : 'View More'}
              </button>
            {toggleDetails === item.id ? (
              <>
                <p><strong>Description:</strong>{item.description}</p>
                <span>
                  {itemQuantity > 0 && item.id === itemId ? 
                    <>
                    <Form as={Row}>
                      <Form.Label column='true' sm='6'>In cart: {itemQuantity}</Form.Label>
                      <Col sm='6'>
                        <Button sm='6' onClick={() => cart.addProductToCart(item.id)} className="mx-2">+</Button>
                        <Button sm='6' onClick={() => cart.removeOneProductFromCart(item.id)} className="mx-2">-</Button>
                      </Col>
                    </Form>
                    <Button variant="danger" onClick={() => cart.deleteFromCart(item.id)}>Remove from cart</Button>
                    </>
                  :<Button id='addCart' onClick={() => handleAddToCart(item.id)}>Add to cart</Button>}
                </span>
                {username === 'Admin' ? (
                  <div id="adminBtns">
                    <DeleteProduct productId={item.id} />
                    <EditProduct productId={item.id} name={item.name} imgUrl={item.imgurl} price={item.price} category={item.category} description={item.description} />
                  </div>
                ):null}
              </>
            ):null}
          </div>
        ))
        ) : (
          <div id="noProducts">
            <p>Products loading please wait...</p>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}