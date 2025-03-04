import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'; // Ensure you have axios installed

const FAQSection = () => {
  const [faqsData, setFaqsData] = useState([]); // State to hold FAQs data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch FAQs data
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api//allfaqs'); // Adjust the URL based on your API
        setFaqsData(response.data); // Set the FAQs data to state
      } catch (err) {
        setError(err); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchFAQs(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching FAQs: {error.message}</div>; // Error handling
  }

  return (
    <div className="faq-section">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        {faqsData.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={faq.id}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>
              {faq.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
