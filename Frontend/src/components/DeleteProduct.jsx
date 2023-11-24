import { Button } from 'react-bootstrap';
import { deleteProduct } from '../apiCalls/utils';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DeleteProduct({ productId }) {

  const deleteItem = async () => {
    try {
      const remove = await deleteProduct(productId);
      if (remove.status === 200) {
        console.log('Product has been removed', remove);
        toast.success('Item has been removed from the store');
        setTimeout(() => {
          window.location.reload(false)
        }, 1200);
      } 
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  return(
    <>
      <Button id='danger' variant='danger' onClick={() => deleteItem()}>Delete Item</Button>
    </>
  )
}