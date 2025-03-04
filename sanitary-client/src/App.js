import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Product from './Product';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';
import FAQSection from './FAQSection';
import './App.css'
import Awards from './Awards';
import Blogs from './Blogs';
import Community from './Community';
import OurTeam from './OurTeam';

const routes = [
  { path: '/', element: <Home/> },
  { path: '/about', element: <About/> },
  { path: '/product', element: <Product /> },
  { path: '/contact', element: <Contact /> },
  { path: '/awards', element: <Awards /> },
  { path:'/faq' ,element:<FAQSection/>},
  { path:'/community' ,element:<Community/>},
  { path:'/blogs',element:<Blogs/>},
  { path:'/ourteam',element:<OurTeam/>}
]

const App = () => {
  
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [location])

  return (
    <>
      <Header />
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
      <Footer />
    </>
  )
}

export default App