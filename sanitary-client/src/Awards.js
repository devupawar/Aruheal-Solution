import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests

const Awards = () => {
  const [awardsData, setAwardsData] = useState([]);

  // Fetch awards data when the component is mounted
  useEffect(() => {
    axios.get('https://api.aruhealths.com/api/api/allaward')
      .then((response) => {
        setAwardsData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the awards data!", error);
      });
  }, []);

  return (
    <div>
      <div className="container-fluid bg-primary hero-header mb-5">
        <div className="container text-center">
          <h1 className="display-4 text-white mb-3 animated slideInDown">Awards</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 animated slideInDown">
              <li className="breadcrumb-item"><a className="text-white" href="#">About</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="awards-section">
        <h2 className="awards-title">Our Awards and Recognitions</h2>
        <div className="awards-grid">
          {awardsData.map((award, index) => (
            <div key={index} className="award-card">
              <img src={`https://api.aruhealths.com/${award.awardImage}`} alt={award.awardTitle} className="award-image" />
              <a href='https://fb.watch/nLtr6T8UwR/?mibextid=2Rb1fB'><h3 className="award-title">{award.awardTitle}</h3></a>
              <p className="award-year">{award.awardYear}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;
