import React from "react";
import {
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    // bg-base-100 text-base-content  py-14 px-4 md:px-10 lg:px-20
    <footer className="bg-base-100 text-base-content rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <Link to="/" className="flex items-center">
                <Logo className="w-60"></Logo>
              </Link>
            </div>
            <p className="text-sm text-base-content/70">
              Your trusted partner for vehicle booking and trip management.
              Discover, book, and manage your travel with ease.
            </p>
            <div className="flex space-x-4">
              {[
                { href: "https://x.com/MobinMiah12", icon: <FaXTwitter /> },
                {
                  href: "https://www.linkedin.com/in/md-mobin-miah-8830b93a2",
                  icon: <FaLinkedinIn />,
                },
                {
                  href: "https://www.facebook.com/mobinkhan.mobin.33",
                  icon: <FaFacebookF />,
                },
                { href: "https://github.com/mobinmiah", icon: <FaGithub /> },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Home", to: "/" },
                { name: "All Vehicles", to: "/allvehicles" },
                { name: "About Us", to: "/about-us" },
                { name: "Contact Us", to: "/contactus" },
                { name: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Our Services</h4>
            <div className="flex flex-col space-y-2">
              {[
                { icon: <FaCar />, text: "Vehicle Booking" },
                { icon: <FaUsers />, text: "Trip Management" },
                { icon: <FaShieldAlt />, text: "Secure Payments" },
                { icon: <FaPhone />, text: "24/7 Support" },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 text-base-content/70"
                >
                  <span className="text-primary">{service.icon}</span>
                  <span>{service.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Contact Info</h4>
            <div className="space-y-3">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  text: "123 Travel Street, Dhaka, Bangladesh",
                },
                { icon: <FaPhone />, text: "+880 1234 567890" },
                { icon: <FaEnvelope />, text: "support@travelease.com" },
              ].map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 text-base-content/70"
                >
                  <span className="text-primary flex-shrink-0">
                    {info.icon}
                  </span>
                  <span className="text-sm">{info.text}</span>
                </div>
              ))}
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
              {[
                { name: "Privacy Policy", to: "/privacy" },
                { name: "Terms of Service", to: "/terms" },
                { name: "Help Center", to: "/help" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
