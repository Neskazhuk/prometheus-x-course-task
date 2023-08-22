import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        Made in&nbsp;
      <Link to="https://prometheus.org.ua/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Prometheus
      </Link>
      &nbsp;© 2023
    </footer>
  );
}

export default Footer;
