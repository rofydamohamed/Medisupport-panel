import React from 'react';
import ScrollToTop from './ScrollToTop';
//import ProtectedRoute from './ProtectedRoute';

const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
    
      
      {children}

    
    </>
  );
};

export default Layout;
