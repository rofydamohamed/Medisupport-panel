import React from 'react';
import ScrollToTop from './ScrollToTop';
import Header from "./header";
import Footer from "./footer";
//import ProtectedRoute from './ProtectedRoute';

const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Header/>
      
      {children}

      <Footer/>
    </>
  );
};

export default Layout;
