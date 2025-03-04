import React from 'react'
import  superabsorbent from '../src/images/absorbant.png'

const About = () => {
  return (
    <div>
         <div className="container-fluid bg-primary hero-header mb-5">
        <div class="container text-center">
            <h1 class="display-4 text-white mb-3 animated slideInDown">About Us</h1>
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
                        <p style={{marginTop:'1vw', color:'black'}}>Happeefive pads are eco-friendly, they not only care for you but also protect the environment, ensuring sustainability with every use</p>

                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-12 wow fadeIn" data-wow-delay="0.3s">
                <div className="feature-item position-relative  text-center p-3" style={{ borderRadius: '50%' }}>
                    <div className="" style={{ borderRadius: '50%' }}>
                        <img src={superabsorbent} className='card2-img' alt="Super Absorbent Core" />
                        <h5 className="text-brown mb-0" style={{fontSize:'1.5rem'}}>Super Absorbent Core</h5>
                        <p style={{marginTop:'1vw', color:'black'}}>Happeefive pads feature a super absorbent core, providing leak-proof protection and long lasting comfort</p>

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
                <img className="img-fluid infinite" src="assets/img/DSC07366.jpg" alt="Sanitary Pad"/>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <h1 className="text-primary mb-4">Comfort <span className="fw-light text-dark">With Every Step</span></h1>
                <p className="mb-4">Our sanitary pads are designed to keep you comfortable and protected throughout your day. Made with soft cotton and a super absorbent core, they're hypoallergenic and gentle on your skin.</p>
                <p className="mb-4">Feel confident and secure with our high-quality pads that offer exceptional protection during your period. Stay fresh and dry all day long.</p>
                <a className="btn btn-primary py-2 px-4" href="#">Shop Now</a>
            </div>
        </div>
    </div>
</div>

<div className="container-fluid testimonial bg-primary my-5 py-5">
    <div className="container text-white py-5">

      
        <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{maxWidth:'1000px'}}>
            <div className="mb-4">
                <img src="assets/img/vision.png" alt="vision-icon" style={{width: '150px', height: '150px'}} />
            </div>
           
            <p className="mb-5" style={{fontSize:'1.5rem'}}>
            At Aruheal, we aim for a future where menstrual hygiene is both eco-friendly and empowering. We want to lead in providing healthy products, protect the environment, and ensure everyone has access to safe and sustainable hygiene.
            </p>
        </div>

        {/* Mission Section */}
        <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{maxWidth:'1000px'}}>
            <div className="mb-4">
                <img src="assets/img/mission.png" alt="mission-icon" style={{width: '150px', height: '150px'}} />
            </div>
            {/* <h1 className="text-white mb-3">
                 <span style={{color:'#3f4092',fontWeight:'bold'}}>Mission</span>
            </h1> */}
            <p className="mb-5" style={{fontSize:'1.5rem'}}>
            Our mission is to create eco-friendly sanitary and maternity pads from banana stem pulp. We aim to improve women’s health, support local farmers, and provide jobs for women, all while protecting the environment.
            </p>
        </div>
    </div>
</div>



    </div>
  )
}

export default About