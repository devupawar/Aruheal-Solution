import React from 'react';
import Slider from 'react-slick'; // For the carousel\
import './OurTeam.css'
import director1 from './images/dole.JPG'
import director2 from './images/motimam1.JPG'
import team2 from './images/team2.JPG'
import team3 from './images/team3.JPG'

const OurTeam = () => {
  // Sample data for directors and team members
  const directors = [
    { id: 1, name: 'Archana Jayant Mahajan', Occupation:'(Pharmacist,Certified Yoga Trainer)',image: director1 },
    { id: 2, name: 'Rudrani Nitin Deore',  Occupation:'(M.A Yoga) ',image:director2  },
  ];

  const teamMembers = [
    { id: 1, image: 'assets/img/team1.JPG', description: 'Working on a project' },
    { id: 2, image: team2, description: 'At a sanitary event' },
    { id: 3, image: team3, description: 'In the office' },
    // Add more team members as needed
  ];

  // Carousel settings
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
    <> 
     <div className="container-fluid bg-primary hero-header mb-5">
       <div className="container text-center">
         <h1 className="display-4 text-white mb-3 animated slideInDown">Our Team</h1>
       </div>
     </div>

    <div className="our-team-section">
      {/* Directors Section */}
      <h2 className="section-title">Our Directors</h2>
      <div className="directors-container">
        {directors.map((director) => (
          <div key={director.id} className="director-card">
            <img src={director.image} alt={director.name} className="director-image" />
            <h4 style={{marginTop:'1vw'}}>Director</h4>
            <h3>{director.name}</h3>
            <p>{director.Occupation}</p>
          </div>
        ))}
      </div>

      {/* Team Carousel Section */}
      <h2 className="section-title">Our Team in Action</h2>
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
    </div>
    </>
  );
};

export default OurTeam;
