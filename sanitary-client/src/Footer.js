import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="container-fluid bg-white footer">
        <div className="fcontainer ">
            <div className="row g-2">
               
                <div className="col-md-5 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
                    <h5 className="mb-4">Get In Touch</h5>
                    <p><i className="fa fa-map-marker-alt me-7"></i>  Aruheal Solutions Private Limited,<br/> Adarsh nagar , Jalgaon , Pincode - 425001</p>
                    <p><i className="fa fa-phone-alt me-7"></i>  +91 92099 39693</p>
                    <p><i className="fa fa-envelope me-7"></i> aruhealsolutions@gmail.com</p>
                  
                </div>
                <div className="col-md-6 col-lg-3 wow fadeIn" style={{paddingLeft:"5vw"}} data-wow-delay="0.5s">
                    <h5 className="mb-4">Our Products</h5>
                   <Link className="btn btn-link" to="/product">Sanitary Pads</Link>
                   <Link className="btn btn-link" to="/product">Maternity Pads</Link>
                   <Link className="btn btn-link" to="/product">Panty liners</Link>
                </div>
                <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                    <h5 className="mb-4">Quick Links</h5>
                   <Link className="btn btn-link" to="/about">About Us</Link>
                   <Link className="btn btn-link" to="/awards">Awards & Achievements</Link>
                   <Link className="btn btn-link" to="/ourteam">Our Team</Link>
                   <Link className="btn btn-link" to="/product">Product</Link>
                   <Link className="btn btn-link" to="/contact">Contact Us</Link>
                 
                </div>
                <div className=" col-md-6 col-lg-3 " style={{justifyContent:'center'}}>
                <h5 className="mb-4">Follow Us</h5>
                <div className='d-flex pt-2'>
                <a className="btn btn-square btn-outline-primary me-1" href="https://x.com/AruhealL?t=q5dQcMft5uhUEgxVp8k4GQ&s=09"><i className="fab fa-twitter"></i></a>
                       <a className="btn btn-square btn-outline-primary me-1" href="https://www.facebook.com/profile.php?id=100084670014377&mibextid=ZbWKwL"><i className="fab fa-facebook-f"></i></a>
                       <a className="btn btn-square btn-outline-primary me-1" href="https://www.instagram.com/aruheal_solutions_pvt_ltd?igsh=MWFhN2MweWxydXB1Mg=="><i className="fab fa-instagram"></i></a>
                       <a className="btn btn-square btn-outline-primary me-1" href="https://www.linkedin.com/company/aruhealindia/?viewAsMember=true"><i className="fab fa-linkedin-in"></i></a>

                </div>
                    </div>
            </div>
        </div>
        
        <div className=" fcontainer wow fadeIn" data-wow-delay="0.1s">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy;<Link className="border-bottom" to="/">Aruheal</Link>, All Rights Reserved.
                        Designed By<a className="border-bottom" href="www.shreedigimarketing.in"> Shree Digital Marketing Agency</a>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                           <Link to="/">Home</Link>
                           <Link to="/about">About</Link>
                           <Link to="/product">Product</Link>
                           
                           <Link to="/contact">contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  );
}

export default Footer;
