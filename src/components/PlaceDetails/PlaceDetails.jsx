import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [bookingDate, setBookingDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeData = await placeService.show(placeId);
        setPlace(placeData);
        setComments(placeData.comments || []);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlace();
  }, [placeId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      author: 'User',
      text: newComment,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setRating(5);
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

      {/* Booking Form */}
      <div className="booking-box">
        <h2>${place.price} / per person</h2>
        <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        <input type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
        <p>Total: ${place.price * numPeople || 'NaN'}</p>
        <button onClick={handleBooking}>Book Now</button>
      </div>

      {/* Comments Section */}
      <section className="comments-section">
        <h2>💬 Comments ({comments.length})</h2>
        <div className="comment-form">
          <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts..." />
          <button onClick={handleAddComment}>Submit</button>
        </div>
        <div className="comments-container">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map(comment => (
              <article key={comment.id} className="comment-card">
                <header className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                </header>
                <div className="comment-rating">⭐ {comment.rating}/5</div>
                <p className="comment-text">{comment.text}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default PlaceDetails;
