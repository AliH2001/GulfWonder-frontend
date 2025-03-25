import React, { useState, useEffect } from 'react';
import './Landing.css';
import * as placeService from '../../services/placeService'; // Import the placeService

const Landing = () => {
  const [places, setPlaces] = useState([]); // State to hold the places data

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await placeService.index(); // Fetch all places using the index function
        setPlaces(fetchedPlaces); // Update the state with the fetched data
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
          <li>Bahrain</li>
          <li>UAE</li>
          <li>Oman</li>
          <li>KSA</li>
          <li>Kuwait</li>
          <li>Qatar</li>
        </ul>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>What We Serve</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Calculate Weather</h3>
            <p>Get real-time weather updates for your chosen destination.</p>
          </div>
          <div className="service-card">
            <h3>Best Tour Guide</h3>
            <p>Experience tours with expert guides knowledgeable about the region.</p>
          </div>
          <div className="service-card">
            <h3>Customization</h3>
            <p>Personalize your tour experience as you desire.</p>
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