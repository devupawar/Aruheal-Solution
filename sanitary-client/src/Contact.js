import React, { useState } from 'react';
import FAQSection from './FAQSection';
import axios from 'axios';
import './Contact.css'

const Contact = () => {
  // Step 1: State management for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('https://api.aruhealths.com/api/api/addenquiry', formData); // Update URL with your actual API endpoint
      setStatusMessage('Enquiry submitted successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form fields
      console.log(response.formData)
    } catch (error) {
      setStatusMessage('Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <div>
      <div className="container-fluid bg-primary hero-header mb-5">
        <div className="container text-center">
          <h1 className="display-4 text-white mb-3 animated slideInDown">Contact Us</h1>
        </div>
      </div>

    
      <div className="container-fluid py-5">
      <div className="container">
  <div className="row g-4">
    <div className="col-lg-4 contact-box wow fadeIn" data-wow-delay="0.1s">
      <div 
        className="contact-info-item position-relative text-center p-3"
        style={{
          border: "2px solid #90bc79",  
          borderRadius: "10px",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)", // Added shadow
          transition: "0.3s ease" //
        }}
      >
        <div className="py-3">
          <i className="fa fa-map-marker-alt fa-2x brown-icon mb-2"></i>
          <h5 className="text-black">Office Address</h5>
          <h5 className="fw-light text-black" style={{fontSize:'1.1rem'}}>Om Niwas, plot No.167, behind D-Mart, Adarsh Nagar, Jalgaon, Maharashtra 425001</h5>
        </div>
      </div>
    </div>

    <div className="col-lg-4 contact-box wow fadeIn" data-wow-delay="0.3s">
      <div 
        className="contact-info-item position-relative text-center p-3"
        style={{
          border: "2px solid #90bc79", 
          borderRadius: "10px",
           boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)", // Added shadow
          transition: "0.3s ease"
        }}
      >
        <div className="py-3 px-3">
        <i className="fa fa-phone-alt fa-2x brown-icon mb-2"></i>
          <h5 className="text-black">Call Us</h5>
          <h5 className="fw-light text-black">+91 9209939693</h5>
          <h5 className="fw-light text-black">+91 8788664860</h5>
        </div>
      </div>
    </div>

    <div className="col-lg-4 contact-box wow fadeIn" data-wow-delay="0.5s">
      <div 
        className="contact-info-item position-relative text-center p-3"
        style={{
          border: "2px solid #90bc79", 
          borderRadius: "10px",
           boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)", // Added shadow
          transition: "0.3s ease"
        }}
      >
        <div className="py-4">
          <i className="fa fa-envelope fa-2x brown-icon mb-2"></i>
          <h5 className="text-black">Mail Us</h5>
          <h5 className="fw-light text-black" style={{ fontSize: "1.1rem" }}>aruhealsolutions@gmail.com</h5>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
            <h1 className="text-primary mb-5">
              <span className="fw-light text-dark">Got Any Questions?</span><br/> We're Here to Help
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-7 wow fadeIn" data-wow-delay="0.1s">
              <p className="mb-4">
                Please fill out the contact form below and our team will get back to you as soon as possible. For immediate assistance, feel free to reach out to us through phone or email.
              </p>
              <div className="wow fadeIn" data-wow-delay="0.3s">
                <form onSubmit={handleSubmit}> {/* Step 4: Attach submit handler */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} // Step 5: Attach change handler
                          placeholder="Your Name" 
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          placeholder="Your Email" 
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange}
                          placeholder="Subject" 
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea 
                          className="form-control" 
                          placeholder="Leave a message here" 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange}
                          style={{ minHeight: '150px' }} 
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
                {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>} {/* Status message */}
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 wow fadeIn" data-wow-delay="0.5s">
              <div className="map-container">
                <iframe 
                 title="map" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.099930842972!2d75.55854497471331!3d20.988630989156622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90f3f3211da93%3A0x979613e41939c5f6!2saruheal%20solutions!5e0!3m2!1sen!2sin!4v1728025311255!5m2!1sen!2sin"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
    </div>
  );
};

export default Contact;
