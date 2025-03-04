import React, { useState } from 'react'
import './Home.css'
import axios from 'axios';
import  superabsorbent from '../src/images/absorbant.png'

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        experience: '',
        referral: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Simple validation
        if (!formData.name || !formData.email || !formData.contactNo) {
            setError('Name, Email, and Contact No are required');
            return;
        }

        try {
            const response = await axios.post('https://api.aruhealths.com/api/api/addDistributorEnquiry', formData);
            setSuccess('Enquiry submitted successfully!');
            setError(null); // Clear any previous error
            setFormData({ // Reset form
                name: '',
                email: '',
                contactNo: '',
                experience: '',
                referral: ''
            });
        } catch (err) {
            setError(err.response.data.message || 'Error submitting enquiry');
            setSuccess(null); // Clear any previous success message
        }
    };
   
  return (
    <div>
         <div className="container-fluid bg-primary hero-header mb-5 home">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                    <h1 className="fw-light text-white animated slideInRight">Banana Stem Pulp & Gel Based Sanitary Napkins</h1>
                    <p style={{color:'#8a6525', fontWeight:'800', textAlign:'center', fontSize:'1.5rem'}}>by her, for her</p>
                    {/* <h1 className="fw-light " style={{color:'white'}}><img src='assets/img/Screenshot_2024-09-16_130809-removebg-preview.png' className="hlogo-img"  ></img> For Sustainable Period Care</h1> */}
                    <p className="text-white mb-4 animated slideInRight">
                    We Believe Every Woman Deserves Comfort and Confidence. Our Range of Sanitary Pads Offers Superior Protection, Reliability, and Comfort for Every Flow. Designed to Give You Peace of Mind, No Matter the Time of the Month.</p>
                    <a href="/product" className="btn btn-dark py-2 px-4 me-3 animated slideInRight" style={{backgroundColor:'#8a6525', border:'1px solid #8a6525'}}>Shop Now</a>
                    <a href="/contact" className="btn btn-outline-dark py-2 px-4 animated slideInRight"  style={{ color:'#8a6525',fontWeight:'bold' ,border:'2px solid #8a6525'}}>Contact Us</a>
                </div>
                <div className="col-lg-6">
                    <img className="img-fluid  infinite"  src="assets/img/IMG_20241027_161925-removebg-preview.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
   
    <div className="container-fluid py-5">
    <div className="container">
        <div className="row g-4">
            <div className="col-lg-4 col-12 wow fadeIn rectangle" data-wow-delay="0.1s">
                <div className="feature-item position-relative text-center p-3" style={{ borderRadius: '50%' }}>
                    <div className="" >
                        <img src='assets/img/eco-friendly-removebg-preview.png' className='card-img' alt="Eco-Friendly Material" />
                        <h5 className="text-black mb-0" style={{fontSize:'1.5rem'}}>Eco-Friendly Material</h5>
                        <p style={{marginTop:'1vw', color:'black'}}>Hapeefive pads are eco-friendly, they not only care for you but also protect the environment, ensuring sustainability with every use</p>

                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-12 wow fadeIn" data-wow-delay="0.3s">
                <div className="feature-item position-relative  text-center p-3" style={{ borderRadius: '50%' }}>
                    <div className="" style={{ borderRadius: '50%' }}>
                        <img src={superabsorbent} className='card2-img' alt="Super Absorbent Core" />
                        <h5 className="text-brown mb-0" style={{fontSize:'1.5rem'}}>Super Absorbent Core</h5>
                        <p style={{marginTop:'1vw', color:'black'}}>Hapeefive pads feature a super absorbent core, providing leak-proof protection and long lasting comfort</p>

                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-12 wow fadeIn" data-wow-delay="0.5s">
                <div className="feature-item position-relative  text-center p-3" style={{ borderRadius: '50%' }}>
                    <div className="" style={{ borderRadius: '50%' }}>
                        <img src='assets/img/rashfree.avif' className='card3-img' alt="Rash Free" />
                        <h5 className="text-brown mb-0" style={{fontSize:'1.5rem'}}>Rash Free</h5>
                        <p style={{marginTop:'1vw', color:'black'}}>Since Hapeefive pads don’t contain chemicals, they provide a rash and irritation free experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div className="container-fluid py-5">
    <div className="container">
        <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                <img className="  img" src="assets/img/DSC07366-removebg-preview.png" alt="Sanitary Pad"/>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <h1 className="text-primary mb-4"  >Natural Comfort <span className="fw-light text-dark">With Every Step</span></h1>
                <p className="mb-4">Our Sanitary Pads Are Crafted From Banana Stem Pulp, Providing an Eco-Friendly and Sustainable Solution Without Compromising on Comfort. They Are Highly Absorbent and Gentle on Sensitive Skin.</p>
                <p className="mb-4">Experience Nature’s Softness With Every Step. Stay Fresh and Protected, Knowing You're Making a Difference With Biocompatible Pads That Care for You and the Planet.</p>
                <a className="btn btn-primary py-2 px-4" style={{backgroundColor:'#8a6525', border:'1px solid #8a6525'}} href="/product">Shop Now</a>
            </div>
        </div>
    </div>
</div>

   
  
<div className="container-fluid py-5">
    <div className="container">
        <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{maxWidth:'600px'}}>
            <h1 className="text-primary mb-3">
                <span className="fw-light text-dark">Benefits Of Our</span> Hapeefive  Pads
            </h1>
            <p className="mb-5">
                Experience the ultimate comfort and protection with our premium sanitary pads, designed to keep you feeling fresh and confident throughout your day.
            </p>
        </div>
        <div className="row g-4 align-items-center">
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                <div className="row g-5">
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Ultra-Absorbent</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Our pads provide superior absorbency to keep you dry and comfortable all day.</span>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Chemical Free</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Stay protected with chemical-free sanitary pads, offering gentle care for sensitive skin.</span>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Perfume Free</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Experience the comfort of perfume-free sanitary pads for all-day freshness without irritation.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                <img className="img-fluid infinite" src="assets/img/feature.jpg" alt="Premium Sanitary Pads"/>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                <div className="row g-5">
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Comfortable Fit</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Designed for a perfect fit to prevent leaks and ensure maximum comfort.</span>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Rashfree</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Made from organic materials to minimize skin sensitivity and irritation.</span>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="btn-square rounded-circle border flex-shrink-0" style={{width:'80px' , height:'80px'}}>
                            <i className="fa fa-check fa-2x text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <h5>Eco-Friendly</h5>
                            <hr className="w-25 bg-primary my-2"/>
                            <span>Our pads are designed with eco-friendly materials to support sustainability.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div className="container-fluid how-to-use bg-primary my-5 py-5">
    <div className="container text-white py-5">
        <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{maxWidth:'600px'}}>
            <h1 className="text-white mb-3">
                <span className="fw-light text-dark">How To Use</span> Hapeefive
                <span className="fw-light text-dark"> Sanitary Pads</span>
            </h1>
            <p className="mb-5">
                Follow these simple steps for a comfortable, hygienic, and secure experience with our premium Hapeefive sanitary pads.
            </p>
        </div>
        <div className="row g-5">
       
            <div className="col-lg-3 text-center wow fadeIn" data-wow-delay="0.1s">
                <div className="btn-square rounded-circle border mx-auto mb-4" style={{width:'120px' , height:'120px'}}>
                    <img src="assets/img/step1 (1).png" alt="wash-yourself-icon" style={{width: '100%', height: '100%'}}/>
                </div>
                <h5 className="text-white">Step 1<br/> Start with a Fresh Pad</h5>
                <hr className="w-25 bg-light my-2 mx-auto"/>
                <span>Take a fresh pad from the box and ensure your hands are clean and dry.</span>
            </div>
          
            <div className="col-lg-3 text-center wow fadeIn" data-wow-delay="0.3s">
                <div className="btn-square rounded-circle border mx-auto mb-4" style={{width:'120px' , height:'120px'}}>
                    <img src="assets/img/step2(4).png" alt="peel-pad-icon" style={{width: '100%', height: '100%'}}/>
                </div>
                <h5 className="text-white">Step 2<br/>  Peel & Apply</h5>
                <hr className="w-25 bg-light my-2 mx-auto"/>
                <span>Peel off the wrapper from the back of the pad. Stick the pad to your panty.</span>
            </div>
      
            <div className="col-lg-3 text-center wow fadeIn" data-wow-delay="0.5s">
                <div className="btn-square rounded-circle border mx-auto mb-4" style={{width:'120px' , height:'120px'}}>
                    <img src="assets/img/step3 (2).png" alt="secure-wings-icon" style={{width: '100%', height: '100%'}}/>
                </div>
                <h5 className="text-white">Step 3 <br/> Secure the Wings</h5>
                <hr className="w-25 bg-light my-2 mx-auto"/>
                <span>Fold the wings around your panty and press firmly to secure it in place.</span>
            </div>

            <div className="col-lg-3 text-center wow fadeIn" data-wow-delay="0.7s">
                <div className="btn-square rounded-circle border mx-auto mb-4" style={{width:'120px' , height:'120px'}}>
                    <img src="assets/img/step4.png" alt="change-pad-icon" style={{width: '100%', height: '100%'}}/>
                </div>
                <h5 className="text-white">Step 4<br/>  Change Regularly</h5>
                <hr className="w-25 bg-light my-2 mx-auto"/>
                <span>Change your pad every 4-6 hours or as needed. Dispose it properly.</span>
            </div>

        </div>
    </div>
</div>


<div className="container-fluid py-5">
      <div className="container">
        <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
          <h1 className="text-primary mb-5">
            <span className="fw-light text-dark">Interested in Becoming a Distributor?</span> <br/>We Would Love to Hear From You
          </h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-7 wow fadeIn" data-wow-delay="0.1s">
            <p className="mb-4">
              Please fill out the form below with your details, and our team will get back to you as soon as possible. We appreciate your interest in partnering with us.
            </p>
            <div className="wow fadeIn" data-wow-delay="0.3s">
            <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required />
                        <label htmlFor="email">Email Address</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="tel" className="form-control" id="contactNo" name="contactNo" placeholder="Your Contact Number" value={formData.contactNo} onChange={handleChange} required />
                        <label htmlFor="contactNo">Contact No</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="experience" name="experience" placeholder="Previous Experience" value={formData.experience} onChange={handleChange} />
                        <label htmlFor="experience">Previous Experience</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="referral" name="referral" placeholder="How did you hear about us?" value={formData.referral} onChange={handleChange} />
                        <label htmlFor="referral">How did you hear about us?</label>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                        Submit Form
                    </button>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
            </div>
        </form>
            </div>
          </div>
          <div className="col-lg-5 wow fadeIn" data-wow-delay="0.5s">
          <img className="img-fluid " src="assets/img/global_sales.jpg" alt="Sanitary Pad"/>

          </div>
        </div>
      </div>
    </div>
</div>


  )
}

export default Home