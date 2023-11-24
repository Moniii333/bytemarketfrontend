import { createProduct } from "../apiCalls/utils";
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imgUrl || !newProduct.category) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        imgUrl: "",
        category: "",
      });

      // Handle success (e.g., show a success message)
      console.log("Product added successfully!");
      toast.success('Product has been added!')
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error adding product:", error);
      toast.warn('Unable to add the product')
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product Form</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <p></p>
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
            rows='3'
            cols='25'
          />
        </label>
        <p></p>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <p style={{ fontSize: '15px' }}><em>Do not add commas</em></p>
        </label>
        <p></p>
        <label>
          Image URL:
          <input
            type="text"
            name="imgUrl"
            value={newProduct.imgUrl}
            onChange={handleChange}
            required
          />
        </label>
        <p></p>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
          <p style={{ fontSize: '15px' }}><em>Only 'tablet', 'phone', 'monitor', 'setup', 'headphones', 'charger' allowed</em></p>
        </label>
        <p></p>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
