import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Portfolio2MinLogo from '../../assets/Portfolio2Min_Logo.png';
import useAuthStore from "../../Zustand/Auth Store/useAuthStore"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthenticated} = useAuthStore();
  const navLinks = [
    { to: "/howitworks", label: "How It Works" },
    { to: "/features", label: "Features" },
  ];

  return (
    <header className="top-0 left-0 right-0 bg-gray-900 backdrop-blur-sm bg-opacity-90 border-b border-gray-800 z-50">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        {/* Logo Section with Text */}
        <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={Portfolio2MinLogo} 
            alt="Portfolio2Min Logo" 
            className="h-14 w-auto object-contain rounded-md cursor-pointer" 
          />
         <div className="hidden md:flex text-white font-bold text-xl tracking-tight ml-2">
              Portfolio<span className="text-green-500">2Min</span>
          </div>
        </Link>
        </div>

        {/* Main Navigation - Centered */}
        <nav className="hidden md:block flex-grow max-w-2xl mx-auto">
          <ul className="flex items-center justify-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons and Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4">
         {isAuthenticated ? (<>
          <Button 
            asChild 
            variant="default" 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 transition-all duration-200"
          >
            <Link to="/user-dashboard">User Dashboard</Link>
          </Button>
         </>) : (<>
          <Button 
            asChild 
            variant="default" 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 transition-all duration-200"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button 
            asChild 
            variant="default" 
            className="bg-[#09090B] hover:bg-green-600 text-white rounded-full px-6 transition-all duration-200"
          >
            <Link to="/register">Register</Link>
          </Button>
         </>)}
          {/* <AvatarDemo/> */}
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block w-full py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-sm font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;