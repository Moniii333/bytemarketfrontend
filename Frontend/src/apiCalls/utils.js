import axios from 'axios'
const BASE_URL = 'https://bytemarketapi.onrender.com/api'
const STRIPE_URL = 'https://bytemarketapi.onrender.com'

const token = sessionStorage.getItem('token')

// register
const RegisterANewUser = async ({ username, password, email }) => {  
  try{
    const res = await axios.post(`${BASE_URL}/users/register`, {
      username,
      password,
      email
    })
    return res
  }catch(error){
    console.error('Failed to register user:', error)
  }
}

// login
const userLogin = async ({ username, password }) => {
  try{
    const response = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password
    })
    return response.data
  } catch(error) {
    console.error('Failed to login:', error)
  }
}

// update user address info
const updateShipmentInfo = async ({ user_id, first_name, last_name, address }) => {
  try{
    const response = await axios.post(`${BASE_URL}/users/me`,{
      user_id,
      first_name,
      last_name,
      address,
    },
    {
    headers: {
      'Authorization': `Bearer ${token}`,
    }})
    if(response){
      return response
    }
  }catch(error){
    console.warn('Failed to update user shipment information:', error)
  }
}

// user info
const userInfo = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if(response) {
      return response
    }
  } catch(error) {
    if(error.response && error.response.status === 500) {
      console.info('User is not logged in')
    } else {
      console.warn('Failed to get user\'s info:', error.message)
    }
  }
}

const getAllProducts = async () => {
  try{
    const res = await axios.get(`${BASE_URL}/products`)
    if(res) {
      return res.data
    }
  }catch(error){
    console.warn('Failed to get all products:', error)
  }
}

const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Failed to create product:', error);
  }
};

const deleteProduct = async ( productId ) => {
  try{
    const response = await axios.delete(`${BASE_URL}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if(response.status === 200) {
      console.log('Deleted successfully:', response)
      return response
    }
  }catch(error){
    console.warn('Failed to delete product:', error)
  }
}

const editProduct = async ( productId, updatedProduct ) => {
  console.log('Received updated product:', updatedProduct)

  try{
    const response = await axios.patch(`${BASE_URL}/products/${productId}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if(response.status === 200){
      return response
    }
  }catch(error){
    console.warn('Unable to edit the product:', error)
  }
}

const getProductID = async (id) => {
  try{
    const response = await axios.get(`${BASE_URL}/products/${id}`)
    if(response) {
      return response
    }
  }catch(error){
    console.log('Error getting product id:', error)
  }
}

const completePurchase = async (items) => {
  const id = sessionStorage.getItem('id')
  if(id === null) {
    console.log('Login to checkout!')
    return
  }
  const data = JSON.stringify(items)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${STRIPE_URL}/stripe/create-checkout-session/${id}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data : data
  }
  try{
    const response = await axios.request(config)
    console.log('Stripe checkout:', JSON.stringify(response.data))
    window.location.href = response.data.url
  }catch(error){
    console.error('Error completing purchase:', error)
  }
}

const allCustomerAccounts = async () => {
  try{
    const response = await axios(`${BASE_URL}/users/allusers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if(response){
      return response
    }
  }catch(error){
    console.warn('Failed to return all customers:', error)
  }
}

export { RegisterANewUser, getAllProducts, userLogin, userInfo, updateShipmentInfo, createProduct, getProductID, completePurchase, deleteProduct, editProduct, allCustomerAccounts }