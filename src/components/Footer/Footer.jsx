import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaFacebookF,  FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
      <footer className="footer footer-horizontal footer-center bg-base-100 rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://x.com/MobinMiah12">
              <FaXTwitter />
            </Link>
            <Link to="www.linkedin.com/in/md-mobin-miah-8830b93a2">
              <FaLinkedinIn />
            </Link>
            <Link to="https://www.facebook.com/mobinkhan.mobin.33">
              <FaFacebookF />
            </Link>
            <Link to="https://github.com/mobinmiah">
              <FaGithub />
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by PH
            B12 Student
          </p>
        </aside>
      </footer>
    );
};

export default Footer;