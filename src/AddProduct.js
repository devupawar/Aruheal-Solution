import React, { useState } from 'react';
import './css/AddProduct.css';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        size: '',
        price: '',
        image: null,
    });
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setProduct({ ...product, image: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('size', product.size);
        formData.append('price', product.price);
        formData.append('image', product.image);  // Ensure 'image' matches the input name
    
        try {
            const response = await fetch('https://api.aruhealths.com/api/api/addproduct', {
                method: 'POST',
                body: formData,
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('Product added successfully!');
            } else {
                alert('Failed to add product: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product.');
        }
    };
    
    return (
        <div className="add-product-form-container">
            <h2 className="form-header">Add New Product</h2>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Product Size</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        placeholder="Enter product size (e.g., Small, Medium)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        required
                    />
                </div>

                <div className="form-group">
    <label htmlFor="image">Product Image</label>
    <input
        type="file"
        id="image"
        name="image"  // Use 'image' here as in the backend code
        accept="image/*"
        onChange={handleChange}
        required
    />
</div>


                <button type="submit" className="submit-button">Add Product</button>
                <Link to='/viewproducts' > <button className='view-button' >View Products</button></Link>
            </form>
        </div>
    );
};

export default AddProduct;
