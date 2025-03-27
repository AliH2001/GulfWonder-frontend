import React, { useState, useEffect } from 'react';
import './Landing.css';
import * as placeService from '../../services/placeService';

const Landing = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await placeService.index();
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="header">
        <div className="header-overlay">
          <h1>WELCOME TO GULFWONDER</h1>
          <p>
            Discover the wonders of Gulf countries, explore amazing tours, and find personalized travel experiences!
          </p>
        </div>
      </header>

      {/* Gulf Countries Section */}
      <section className="countries">
        <h2>Explore Gulf Countries</h2>
        <ul className="countries-list">
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/1200px-Flag_of_Bahrain.svg.png"
                alt="Bahrain"
                className="flag-img"
              />
            </div>
            <p>Bahrain</p>
          </li>
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg"
                alt="Qatar"
                className="flag-img"
              />
            </div>
            <p>Qatar</p>
          </li>
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1200px-Flag_of_Saudi_Arabia.svg.png"
                alt="Saudi Arabia"
                className="flag-img"
              />
            </div>
            <p>Saudi Arabia</p>
          </li>
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/1200px-Flag_of_Kuwait.svg.png"
                alt="Kuwait"
                className="flag-img"
              />
            </div>
            <p>Kuwait</p>
          </li>
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6JH4LQGvuDLDkkSmOcicwHKXRQD6j9tT9FqdRoxPCPQ&usqp=CAE&s"
                alt="UAE"
                className="flag-img"
              />
            </div>
            <p>UAE</p>
          </li>
          <li className="country-item">
            <div className="country-flag">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT45gp9aj8z9-gI3bwiYqsWOEje3klfLZc8IeLfotcXVg&usqp=CAE&s"
                alt="Oman"
                className="flag-img"
              />
            </div>
            <p>Oman</p>
          </li>
        </ul>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>What We Serve</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Explore Top Destinations
            </h3>
            <p>Discover the best tourist spots across the Gulf region, from historical landmarks to modern attractions</p>
          </div>
          <div className="service-card">
            <h3>Book Tours Seamlessly
            </h3>
            <p>Easily book tours to your chosen destinations with secure and convenient booking options</p>
          </div>
          <div className="service-card">
            <h3>Share Reviews</h3>
            <p>Leave and read reviews from fellow travelers to help you plan your perfect trip</p>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="tours">
        <h2>Explore Tours</h2>
        <div className="tour-cards">
          {places.length > 0 ? (
            places.map((place) => (
              <div className="tour-card" key={place._id}>
                <img src={place.imageUrl || 'https://via.placeholder.com/400x300'} alt={place.name} />
                <h3>{place.name}</h3>
                <p><strong>{place.location}</strong></p>
                <p>${place.price || '99'} per person</p>
              </div>
            ))
          ) : (
            <p>No tours available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
