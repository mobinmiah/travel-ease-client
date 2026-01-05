import React from 'react';
import { FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCar, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
      <footer className="bg-base-200 text-base-content">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaCar className="text-2xl text-primary" />
                <h3 className="text-2xl font-bold text-primary">TravelEase</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Your trusted partner for vehicle booking and trip management. 
                Discover, book, and manage your travel with ease.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://x.com/MobinMiah12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  <FaXTwitter className="text-xl" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/md-mobin-miah-8830b93a2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a 
                  href="https://www.facebook.com/mobinkhan.mobin.33" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a 
                  href="https://github.com/mobinmiah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-base-content/70 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/allvehicles" className="text-base-content/70 hover:text-primary transition-colors">
                  All Vehicles
                </Link>
                <Link to="/aboutus" className="text-base-content/70 hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contactus" className="text-base-content/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
                <Link to="/dashboard" className="text-base-content/70 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Our Services</h4>
              <nav className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-base-content/70">
                  <FaCar className="text-primary" />
                  <span>Vehicle Booking</span>
                </div>
                <div className="flex items-center space-x-2 text-base-content/70">
                  <FaUsers className="text-primary" />
                  <span>Trip Management</span>
                </div>
                <div className="flex items-center space-x-2 text-base-content/70">
                  <FaShieldAlt className="text-primary" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2 text-base-content/70">
                  <FaPhone className="text-primary" />
                  <span>24/7 Support</span>
                </div>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-base-content/70">
                  <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                  <span className="text-sm">
                    123 Travel Street, Dhaka, Bangladesh
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-base-content/70">
                  <FaPhone className="text-primary flex-shrink-0" />
                  <span className="text-sm">+880 1234 567890</span>
                </div>
                <div className="flex items-center space-x-3 text-base-content/70">
                  <FaEnvelope className="text-primary flex-shrink-0" />
                  <span className="text-sm">support@travelease.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-base-content/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-base-content/70">
                © {new Date().getFullYear()} TravelEase. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-base-content/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link to="/help" className="text-base-content/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;