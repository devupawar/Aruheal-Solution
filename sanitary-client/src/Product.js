import React, { useState, useEffect } from 'react';
import './Product.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios'; // Import Axios

const Product = () => {
  // State for products and testimonials
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // State for modal visibility and selected quantity
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);  // Default quantity is 1

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/products');  // Adjust the URL as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch testimonials from backend on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/testimonials'); // Adjust the URL as needed
        const formattedTestimonials = response.data.map((item, index) => ({
          name: item.testimonialname,
          feedback: item.description
        }));
        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []); 

  // Function to handle Buy Now and show modal
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Function to handle sending WhatsApp message
  const handleSubmit = () => {
    if (selectedProduct) {
      const whatsappMessage = `Hello, I would like to order the following product: \nProduct: ${selectedProduct.name} \nQuantity: ${quantity}`;
      const whatsappURL = `https://api.whatsapp.com/send?phone=+918788664860&text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open the WhatsApp link in a new tab
      window.open(whatsappURL, '_blank');
    }
    setShowModal(false);  // Close the modal after submission
  };

  return (
    <>
      <div>
        <div className="container-fluid bg-primary hero-header mb-5">
          <div className="container text-center">
            <h1 className="display-4 text-white mb-3 animated slideInDown">Products</h1>
          </div>
        </div>

        <div className="container-fluid py-5">
          <div className="container">
            <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
              <h1 className="text-primary mb-3"><span className="fw-light text-dark">Our Hapeefive</span> Products</h1>
              <p className="mb-5">Discover our top-quality sanitary pads designed for maximum comfort and protection. Perfect for every day of your cycle.</p>
            </div>
            <div className="row g-4">
              {products.map((product) => (
                <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s" key={product.id}>
                  <div className="product-item text-center border h-100 p-4">
                    <img className="img-fluid mb-4" src={`https://api.aruhealths.com/${product.image_url}`} alt={product.name} />
                    <div className="mb-2">
                      {Array(5).fill().map((_, index) => (
                        <small className="fa fa-star text-primary" key={index}></small>
                      ))}
                      {/* <small>({product.rating})</small> */}
                    </div>
                    <a href="#" className="h6 d-inline-block mb-2">{product.name}</a>
                    <p>{product.size}</p>
                    <h5 className="text-primary mb-3">₹ {product.price} /-</h5>
                    <button
                      className="btn btn-outline-primary px-3"
                      onClick={() => handleBuyNow(product)}  // Show modal on Buy Now click
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Quantity Selection */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Order {selectedProduct?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="quantityInput">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit Order
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="container-fluid py-5 bg-light" style={{marginTop:'3vw' }}>
        <div className="container position-relative">
          <h2 className="text-center mb-4">Our Customers Love Us!</h2>
          <Carousel 
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 3
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
            }}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
          >
            {testimonials.map((testimonial, index) => (
              <div className="card p-3 border shadow-sm h-100" style={{marginLeft:'2vw' }} key={index}>
                <h6 className="mb-3">{testimonial.name}</h6>
                <p>{testimonial.feedback}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Product;
