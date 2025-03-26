import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService';
import './PlaceDetails.css';

const PlaceDetails = ({user}) => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [review, setreview] = useState([]);
  const [newreview, setNewreview] = useState('');
  const [rating, setRating] = useState(5);
  const [bookingDate, setBookingDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeData = await placeService.show(placeId);
        setPlace(placeData);
        setreview(placeData.review || []);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlace();
  }, [placeId]);

  const handleAddreview = () => {
    if (!newreview.trim()) return;
    const newreviewObj = {
      id: Date.now(),
      author: 'User',
      text: newreview,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setreview([...review, newreviewObj]);
    setNewreview('');
    setRating(rating);
  };

  const handleBooking = () => {
    if (!bookingDate || numPeople < 1) return;
    // alert(`Booking confirmed for ${numPeople} people on ${bookingDate}!`);
  };

  if (!place) return <p>Loading...</p>;

  return (
    <main className="place-details">
      <img src={place.imageUrl || 'https://via.placeholder.com/400x300'} alt={place.name} className="place-image" />
      <div className="details-box">
        <h1>{place.name}</h1>
        <p><strong>Location:</strong> {place.location}, {place.country}</p>
        <p><strong>Price:</strong> ${place.price} / per person</p>
        <p><strong>Description:</strong> {place.description}</p>
      </div>

      {user && !(user.role === "admin") && 
     
     (<>
      {/* Booking Form */}
      <div className="booking-box">
        <h2>${place.price} / per person</h2>
        <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        <input type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
        <p>Total: ${place.price * numPeople || 'NaN'}</p>
        <button onClick={handleBooking}>Book Now</button>
      </div>

      {/* review Section */}
      <section className="review-section">
        <h2>💬 review ({review.length})</h2>
        <div className="review-form">
          <input type="text" value={newreview} onChange={(e) => setNewreview(e.target.value)} placeholder="Share your thoughts..." />
          <button onClick={handleAddreview}>Submit</button>
        </div>
        <div className="review-container">
          {review.length === 0 ? (
            <p>No review yet. Be the first to share your thoughts!</p>
          ) : (
            review.map(review => (
              <article key={review.id} className="review-card">
                <header className="review-header">
                  <span className="review-author">{review.author}</span>
                  <span className="review-date">{review.date}</span>
                </header>
                <div className="review-rating">⭐ {review.rating}/5</div>
                <p className="review-text">{review.text}</p>
              </article>
            ))
          )}
        </div>

        
      </section>
     </>
      )}
      {user && user.role === "admin" && (
          <>
            <Link to={`/places/${place._id}/edit`}>Edit Place</Link>
          </>
        )}
    </main>
  );
};

export default PlaceDetails;
