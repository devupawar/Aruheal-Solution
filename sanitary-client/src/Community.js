import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import './Community.css'; // Optional: Import CSS for additional styling
import slide1 from '../src/images/slide1.jpeg';
import slide2 from '../src/images/slide2.jpeg';
import slide3 from '../src/images/slide4.jpeg';
import slide4 from '../src/images/slide3.jpeg';
import slide5 from '../src/images/slide5.jpeg';
import slide6 from '../src/images/slide6.jpeg';

const Community = () => {
  const teamMembers = [
    { id: 1, image: slide5, description: 'Working on a project' },
    { id: 2, image: slide1, description: 'At a sanitary event' },
    { id: 3, image: slide2, description: 'In the office' },
    { id: 4, image: slide3, description: 'In the office' },
    { id: 5, image: slide4, description: 'In the office' },
    { id: 6, image: slide6, description: 'In the office' },
    // Add more team members as needed
  ];
  // Slick Slider settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <div className="container-fluid bg-primary hero-header mb-5">
        <div className="container text-center">
          <h1 className="display-4 text-white mb-3 animated slideInDown">Community Impact</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 animated slideInDown">
              <li className="breadcrumb-item"><a className="text-white" href="#">About</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Community Impact</li>
            </ol>
          </nav>
        </div>
      </div>


      <div className="team-carousel">
        <Slider {...carouselSettings}>
          {teamMembers.map((member) => (
            <div key={member.id} className="team-slide">
              <img src={member.image} alt={member.description} className="team-image" />
              {/* <p className="team-description">{member.description}</p> */}
            </div>
          ))}
        </Slider>
      </div>


   


      {/* Community Impact Section */}
      <section className="community-section">
        <div className="container">
          <p className="community-paragraph">
            Hapeefive creates jobs, provides women with financial independence, and boosts local economies. The eco-friendly approach reduces agricultural waste and promotes sustainability. By making affordable, biocompatible products, it improves menstrual hygiene access, especially in underserved areas. This also breaks menstrual taboos and raises health awareness. Additionally, using banana pulp supports farmers, creating a circular economy. Overall, the startup empowers women, promotes sustainability, and enhances community well-being.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Community;
