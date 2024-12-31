import React, { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Lazy load Navbar and Footer
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));

function AppLayout() {
  const location = useLocation();

  // Check if the current route should hide the Navbar and Footer
  const hideLayout = (
    location.pathname === "/preview-portfolio" ||
    location.pathname.startsWith("/user-dashboard") ||  
    location.pathname.startsWith("/personal-portfolio")     
  );

  return (
    <div>
      {!hideLayout && (
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
      )}
      <Outlet />
      {!hideLayout && (
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

export default AppLayout;
