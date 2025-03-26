import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as placeService from '../../services/placeService';
import './PlaceForm.css';

const PlaceForm = (props) => {
  const { placeId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: 'https://via.placeholder.com/400x300',
    country: '',
  });

  useEffect(() => {
    const fetchPlace = async () => {
      const placeData = await placeService.show(placeId);
      setFormData(placeData);
    };
    if (placeId) fetchPlace();
  }, [placeId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (placeId) {
      props.handleUpdatePlace(placeId, formData);
    } else {
      props.handleAddPlace(formData);
    }
  };

  return (
    <main className="place-form">
      <form onSubmit={handleSubmit} className="horizontal-form">
        <h1 className="form-title">{placeId ? 'Edit Place' : 'Create New Place'}</h1>
        
        <div className="form-grid">
          <div className="form-column">
            <div className="form-row">
              <label className="form-label" htmlFor="name-input">Name</label>
              <input 
                required 
                type="text" 
                name="name" 
                id="name-input" 
                className="form-input" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="location-input">Location</label>
              <input 
                required 
                type="text" 
                name="location" 
                id="location-input" 
                className="form-input" 
                value={formData.location} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="country-input">Country</label>
              <input 
                required 
                type="text" 
                name="country" 
                id="country-input" 
                className="form-input" 
                value={formData.country} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="imageUrl-input">Image URL</label>
              <input 
                type="url" 
                name="imageUrl" 
                id="imageUrl-input" 
                className="form-input" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="image-preview-container">
              <img 
                src={formData.imageUrl || 'https://via.placeholder.com/400x300'} 
                alt="Preview" 
                className="image-preview" 
              />
            </div>
          </div>

          <div className="form-row">
              <label className="form-label" htmlFor="price-input">Price</label>
              <input 
                required 
                type="number" 
                name="price" 
                id="price-input" 
                className="form-input" 
                value={formData.price} 
                onChange={handleChange} 
              />
            </div>

          <div className="form-column">
            <div className="form-row">
              <label className="form-label" htmlFor="description-input">Description</label>
              <textarea 
                required 
                name="description" 
                id="description-input" 
                className="form-input form-textarea" 
                value={formData.description} 
                onChange={handleChange} 
                rows="6"
                placeholder="Describe the place in detail..."
              />
            </div>

            <button type="submit" className="form-button">
              {placeId ? 'Update Place' : 'Create Place'}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default PlaceForm;