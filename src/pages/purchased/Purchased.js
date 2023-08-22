import React from 'react'
import { Link } from 'react-router-dom';
import './Purchased.css';
import { routes } from 'routing/AppRoutes';
import Button from 'components/button/Button';

function Purchased() {
  return (
    <section className="container">
      <div className="dialog-box">
        <div className="dialog-content">
          <h2 className="dialog-text">Now</h2>
          <p>take your books and go park reading!</p>
          <Link to={routes.booklist} className="btn big">Run</Link>
        </div>
      </div>
    </section>
  );
}

export default Purchased;
