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
          className="place-image1"
        />
      )}

      <div className="card-body">
        <div className="place-meta">
          <h2 className="place-title">{place.name}</h2>
        </div>
        <span className="location-badge"> 📍 {place.location}</span>

        <p><strong>🌍 Country</strong> {place.country}</p>
        <p><strong>Ticket Price</strong> {place.price} 💸 / per person</p>

        <Link to={`/places/${place._id}`}>
          <button className="btn btn-primary">Booking</button>
        </Link>
      </div>
    </article>
  );
};

export default PlaceCard;
