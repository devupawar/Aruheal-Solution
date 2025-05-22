import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ViewProducts.css';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({ name: '', size: '', price: '', image_url: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.aruhealths.com/api/api/products');
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('https://api.aruhealths.com/api/api/deleteproduct', { pid: id });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setUpdateData({ name: product.name, size: product.size, price: product.price, image_url: product.image_url });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.aruhealths.com/api/api/updateproduct', { pid: selectedProduct.id, ...updateData });
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
 
  return (
    <div className="view-products-container">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-cards-container">
          
          {products.map((product) => (
           
            <div key={product.id} className="product-card">
              <img 
                src={`https://api.aruhealths.com/${product.image_url}`} // Update image path
                alt={product.name} 
                className="product-image" 
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Size: {product.size}</p>
                <p>Price: {product.price}</p>
                <button className="update-button" onClick={() => handleUpdate(product)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <form className="update-form" onSubmit={handleUpdateSubmit}>
          <h3>Update Product</h3>
          <input
            type="text"
            value={updateData.name}
            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            value={updateData.size}
            onChange={(e) => setUpdateData({ ...updateData, size: e.target.value })}
            placeholder="Product Size"
            required
          />
          <input
            type="text"
            value={updateData.price}
            onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })}
            placeholder="Product Price"
            required
          />
          <input
          
            value={updateData.image_url}
            onChange={(e) => setUpdateData({ ...updateData, image_url: e.target.value })}
            placeholder="Image URL"
            required
          />
          <button type="submit">Update Product</button>
          <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ViewProducts;
