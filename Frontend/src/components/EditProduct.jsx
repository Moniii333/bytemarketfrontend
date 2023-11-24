import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProduct } from '../apiCalls/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

export default function EditProduct({ productId, name, imgUrl, price, description, category }) {
  const [productName, setProductName] = useState(name || '')
  const [newDescription, setNewDescription] = useState(description || '')
  const [newPrice, setNewPrice] = useState(price.toString() || null)
  const [img, setImg] = useState(imgUrl || '')
  const [newCategory, setNewCategory] = useState(category || '')

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })
  // for edit modal popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const editItem = async (data) => {
    console.log('data info:', data.newPrice, data.newDescription, data.newCategory)

    const updatedProduct = {
      name: data.productName,
      description: data.newDescription,
      price: data.newPrice,
      imgUrl: data.img,
      category: data.newCategory
    }

    try {
      const edit = await editProduct(productId, updatedProduct);
      if (edit.status === 200) {
        toast.success('The product has been updated');
        setTimeout(() => {
          window.location.reload(false);
        }, 1600);
      }
    } catch (error) {
      console.log('Failed to edit the item:', error);
    }
  }


  return (
    <>
      <Button id="editBtn" variant="warning" onClick={openModal}>
        Edit Product
      </Button>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Update products</h4>
          <div>
            <Form>
              <Form.Group>
                <Form.Label htmlFor='productName'>Product Name</Form.Label>
                <Form.Control {...register('productName', {
                  required: 'Please include product name'
                })} value={productName} type='text' onChange={(e) => setProductName(e.target.value)} />
                {errors.productName && <p>{errors.productName?.message}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='newDescription'>Description</Form.Label>
                <Form.Control {...register('newDescription', {
                  required: 'Please enter a description'
                })} value={newDescription} type='text' onChange={(e) => setNewDescription(e.target.value)} />
                {errors.newDescription && <p>{errors.newDescription?.message}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='newPrice'>Price $</Form.Label>
                <Form.Control {...register('newPrice', {
                  required: 'Please enter a valid numeric price', valueAsNumber: true,
                })} value={newPrice} type='number' onChange={(e) => setNewPrice(e.target.value)} />
                <Form.Text>Do not add commas</Form.Text>
                {errors.newPrice && <p>{errors.newPrice?.message}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='img'>imgUrl</Form.Label>
                <Form.Control {...register('img', {
                  required: 'Please enter image link'
                })} value={img} type='text' onChange={(e) => setImg(e.target.value)} />
                {errors.img && <p>{errors.img?.message}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='newCategory'>Category</Form.Label>
                <Form.Control {...register('newCategory', {
                  required: 'Please enter in a category'
                })} value={newCategory} type='text' onChange={(e) => setNewCategory(e.target.value)} />
                {errors.newCategory && <p>{errors.newCategory?.message}</p>}
                <Form.Text>Only 'tablet', 'phone', 'monitor', 'setup', 'headphones', 'charger' allowed</Form.Text>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(editItem)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
