import React from "react";
import { Link } from "react-router-dom";
import "./PlaceCard.css";

const PlaceCard = ({ place }) => {
  return (
    <article className="place-card" key={place._id}>
      {place.imageUrl && (
        <img 
          src={place.imageUrl || "https://via.placeholder.com/400x300"} 
          alt={place.name} 
          className="place-image"
        />
      )}

      <div className="card-body">
        <div className="place-meta">
          <h2 className="place-title">{place.name}</h2>
          <span className="location-badge">📍 {place.location}</span>
        </div>

        <p><strong>Country:</strong> {place.country}</p>
        <p><strong>Price:</strong> {place.price}</p>

        <Link to={`/places/${place._id}`}>
          <button>Booking</button>
        </Link>
      </div>
    </article>
  );
};

export default PlaceCard;
