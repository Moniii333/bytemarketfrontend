import { Sling as Menu } from 'hamburger-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import AddProduct from './AddProduct'
import { allCustomerAccounts } from '../apiCalls/utils'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'


export default function Home({ isAuth, username, info }) {
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
// console.info('username', info)
  useEffect(() => {
      if(isAuth === true) {
        setLoading(false)
    }
  }, [isAuth])

  // users timezone greeting
  const timezoneGreeting = () => {
    const now = new Date()
    const hours = now.getHours()

    if(hours >= 5 && hours < 12) {
      return 'Good morning'
    } else if(hours >= 12 && hours < 17) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }
  const greetings = timezoneGreeting()

  // for modal popup
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  // second modal
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const openModal2 = () => setIsModalOpen2(true)
  const closeModal2 = () => setIsModalOpen2(false)

  // third modal
  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const openModal3 = () => setIsModalOpen3(true)
  const closeModal3 = () => setIsModalOpen3(false)

  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '60%',
    },
  };

  // admin controls
  const [toggleAddProduct, setToggleAddProduct] = useState(false);
  const [customerData, setCustomerData] = useState([])
  const allCustomers = async() => {
    try{
      const result = await allCustomerAccounts()
      if(result){
        // console.info('Returned data:', result.data)
        setCustomerData(result.data)
        setLoading(false)
      }
    }catch(error){
      console.warn('Failed to get customer info:', error)
    }
  }

  return(
    <div className="app">
      <div id="component">
        <h1>ByteMarket</h1>
        { isAuth === true && !loading ? (
          <>
          <h4>{greetings}, {username}</h4>
          <div id='hamburger'>
          <Menu toggled={isOpen} toggle={setOpen} />
              {isOpen && !loading ? (
                <div id='menu'>
                <Link to='/userinfo'>Update shipping info</Link>
                <Link onClick={openModal}>My profile info</Link>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='User profile modal' style={customStyles}>
                  <div>
                  <h2>Profile information</h2>
                      <div key={info.user.id}>
                        <div>
                          <p>Username: {info.user.username}</p>
                          <p>Email: {info.user.email}</p>
                        </div>
                        {info.userShipmentInfo.length > 0 ? (
                          <div key={info.userShipmentInfo[0].id}>
                          <p>First name: {info.userShipmentInfo[0].first_name}</p>
                          <p>Last name: {info.userShipmentInfo[0].last_name}</p>
                          <p>Address: {info.userShipmentInfo[0].address}</p>
                        </div>
                        ) : (
                        <p><em>No available shipping information</em></p>
                        )}
                      </div>
                  </div>
                </Modal>
                {username === 'Admin' ? (
                  <>
                    <Link onClick={openModal2}>Product Management</Link>
                    <Modal isOpen={isModalOpen2} onRequestClose={closeModal2}  contentLabel='Product Edits' style={customStyles}>
                      <div>
                        <h4>Add New Products</h4>
                        <div id="addProduct">
                          <button onClick={() => setToggleAddProduct(!toggleAddProduct)}>Add Product</button>
                        </div>
                      {toggleAddProduct && <AddProduct />}
                      </div>
                    </Modal>
                    <Link onClick={openModal3}>View a list of all registered users</Link>
                    <Modal isOpen={isModalOpen3} onRequestClose={closeModal3} style={customStyles} contentLabel='registered users'>
                      <h4>Registered Users</h4>
                      <Button onClick={() => allCustomers()}>View Users</Button>
                      {customerData !== null ? (
                        <Table>
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerData.map((person) => (
                            <tr key={person.id}>
                              <td>{person.id}</td>
                              <td>{person.username}</td>
                              <td>{person.email}</td>
                              {person.shipInfo.length > 0 ? (
                                <>
                                <td>{person.shipInfo[0].first_name}</td>
                                <td>{person.shipInfo[0].last_name}</td>
                                <td>{person.shipInfo[0].address}</td>
                                </>
                              ): (
                              <>
                              <td>n/a</td>
                              <td>n/a</td>
                              <td>n/a</td>
                              </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      ):null}
                    </Modal>
                  </>
                ):null}
                </div>
              ):null}
          </div>
          </>
        ): (
          <div>
            <br></br>
            <a href='/login'>Click here to login to your account</a>
            <br></br>
            <a href='/register'>Click here to create an account</a>
          </div>
        )}
      </div>
    </div>
  )
}

Modal.setAppElement('#modal')