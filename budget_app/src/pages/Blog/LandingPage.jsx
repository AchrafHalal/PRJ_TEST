import React from 'react';
import './style.css'; 
import image1 from '../../assets/image1.png'; 

export default function LandingPage() {
  return (
    <div>
      <header>
        <div className="nav-bar">
          <nav>
            <div className="logo"><a href="/">LOGO</a></div>
            <div className="list">
              <ul>
                <li><a href="#tickets">Our Services</a></li>
                <li><a href="#highlight">About us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="btn">
              <a href="/register"><button>Sign up</button></a>
              <a href="/login"><button>Log in</button></a>
            </div>
          </nav>
        </div>

        <div className="image-container">
          <img src={image1} alt="" />
          <p>Welcome to web site</p>
        </div>
      </header>

      <div className="section1" id="tickets">
        <h1>Tickets</h1>
        <div className="container">
          <div className="box1">
            <p><a href="#">Buy Your Ticket &gt;&gt;</a></p>
          </div>
          <div className="box2">
            <div className="box2_p">
              <h1>Book for Your Favourite <span>Team</span></h1>
            </div>
            <div className="img">
              <img src="image1.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="section2">
        <h1>Shop</h1>
        <h3>"Shop Like a <span>Champion</span>!"</h3>
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Game Day Essentials</h2>
              <p>Get ready for the ultimate football experience...</p>
              <a href="#" className="btn">Shop Now</a>
            </div>
            <div className="col-md-6">
              <img src="image1.png" className="img-fluid rounded" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="section3" id="highlight">
        <h1>Highlights</h1>
        <h3>"Watch the Recap for the Last Games!"</h3>
        <div className="card-group">
          {/* repeat cards */}
        </div>
      </div>

      <div className="footer" id="contact">
        <div className="footer-links">
          <div className="footer-links_logo">
            <div className="footer-logo"><a href="/">LOGO</a></div>
            <p>All Rights Reserved</p>
          </div>
          <div className="footer-links_div">
            <h4>Links</h4>
            <p>Social Media</p>
            <p>Contact</p>
          </div>
          <div className="footer-links_div">
            <h4>Company</h4>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Contact</p>
          </div>
          <div className="footer-links_div">
            <h4>Get in touch</h4>
            <p>Marocco - Casablanca</p>
            <p>0666-666666</p>
            <p>info@test.net</p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2025 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
