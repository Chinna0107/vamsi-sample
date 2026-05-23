import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Lovito" className="footer-logo-img" /> Lovito
          </Link>
          <p>A premium editor workplace where customers find verified editors, book projects, upload files, manage revisions, and download final work.</p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="#">About Us</Link>
          <Link to="#">Investor Relations</Link>
          <Link to="#">Terms & Conditions</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Anti-discrimination Policy</Link>
          <Link to="#">Careers</Link>
        </div>

        <div className="footer-col">
          <h4>For Customers</h4>
          <Link to="/browse">Find Editors</Link>
          <Link to="/customer">Customer Dashboard</Link>
          <Link to="#">Lovito Reviews</Link>
          <Link to="#">Editing Categories</Link>
          <Link to="#">Contact Us</Link>
        </div>

        <div className="footer-col">
          <h4>For Professionals</h4>
          <Link to="/login">Register as Editor</Link>
          <Link to="#">Partner with Us</Link>
          <Link to="/editor">Editor Panel</Link>
          <Link to="#">Delivery Guidelines</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>* Static demo workplace for editor booking flows.</p>
        <p>© Copyright 2026 Lovito Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
