import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeData = await placeService.show(placeId);
        setPlace(placeData);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlace();
  }, [placeId]);

  if (!place) return <p>Loading...</p>;

  return (
    <main className="place-details">
      <h1>{place.name}</h1>
      <img src={place.imageUrl || 'https://via.placeholder.com/400x300'} alt={place.name} />
      <p><strong>Description:</strong> {place.description}</p>
      <p><strong>Location:</strong> {place.location}</p>
      <p><strong>Country:</strong> {place.country}</p>
    </main>
  );
};

export default PlaceDetails;