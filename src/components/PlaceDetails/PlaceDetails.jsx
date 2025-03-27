import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService';
import './PlaceDetails.css';

const PlaceDetails = ({ user, handleDeletePlace }) => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [bookingDate, setBookingDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeData = await placeService.show(placeId);
        setPlace(placeData);
        setReview(placeData.review || []);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlace();
  }, [placeId]);

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    const newReviewObj = {
      id: Date.now(),
      author: 'User',
      text: newReview,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setReview([...review, newReviewObj]);
    setNewReview('');
  };

  const handleBooking = () => {
    if (!bookingDate || numPeople < 1) return;
  };

  const handleDelete = async () => {
    try {
      await handleDeletePlace(placeId);
      navigate('/places'); 
    } catch (error) {
      console.error('Failed to delete place:', error);
    }
  };

  if (!place) return <p>Loading...</p>;

  return (
    <main className="place-details">
      <img src={place.imageUrl || 'https://via.placeholder.com/400x300'} alt={place.name} className="place-image" />
      <div className="details-box">
        <h1>{place.name}</h1>
        <p><strong></strong> 📍 {place.location}</p>
        <p><strong>🌍 Country</strong>{place.country}</p>
        <p><strong>Ticket Price</strong> ${place.price} 💸 / per person</p>
        <p><strong>Description:</strong> {place.description}</p>
      </div>

      {user && !(user.role === "admin") && (
        <>
          <div className="booking-box">
            <h2>${place.price} / per person</h2>
            <input 
              type="date" 
              value={bookingDate} 
              onChange={(e) => setBookingDate(e.target.value)} 
            />
            <input 
              type="number" 
              min="1" 
              value={numPeople} 
              onChange={(e) => setNumPeople(e.target.value)} 
            />
            <p>Total: ${place.price * numPeople || 'NaN'}</p>
            <button onClick={handleBooking}>Book Now</button>
          </div>

          <section className="review-section">
            <h2>💬 Reviews ({review.length})</h2>
            <div className="review-form">
              <input 
                type="text" 
                value={newReview} 
                onChange={(e) => setNewReview(e.target.value)} 
                placeholder="Share your thoughts..." 
              />
              <button onClick={handleAddReview}>Submit</button>
            </div>
            <div className="review-container">
              {review.length === 0 ? (
                <p>No reviews yet. Be the first to share your thoughts!</p>
              ) : (
                review.map(reviewItem => (
                  <article key={reviewItem.id} className="review-card">
                    <header className="review-header">
                      <span className="review-author">{reviewItem.author}</span>
                      <span className="review-date">{reviewItem.date}</span>
                    </header>
                    <div className="review-rating">⭐ {reviewItem.rating}/5</div>
                    <p className="review-text">{reviewItem.text}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        </>
      )}

      {user && user.role === "admin" && (
        <div className="admin-controls">
          <button 
            onClick={() => navigate(`/places/${place._id}/edit`)} 
            className="edit-button"
          >
            Edit Place
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Place
          </button>
        </div>
      )}
    </main>
  );
};

export default PlaceDetails;
