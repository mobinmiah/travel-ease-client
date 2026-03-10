import React from "react";
import logo from "../../assets/logo.png";

const Logo = ({ width = 150, height = 50, className = "" }) => {
  return (
    <img
      src={logo}
      alt="TravelEase Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
};

export default Logo;
