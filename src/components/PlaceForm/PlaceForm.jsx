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
    imageUrl: 'https://growthbusiness-production.s3.amazonaws.com/uploads/2022/10/Location-based-technology-e1536853189676.jpeg',
    country: '',
    price: ''
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
    <section className="h-100 h-custom" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img src={formData.imageUrl || 'https://growthbusiness-production.s3.amazonaws.com/uploads/2022/10/Location-based-technology-e1536853189676.jpeg'}
                className="w-100" style={{ 
                  borderTopLeftRadius: '.3rem', 
                  borderTopRightRadius: '.3rem',
                  height: '300px',
                  objectFit: 'cover'
                }}
                alt="Preview"
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  {placeId ? 'Edit Place' : 'Create New Place'}
                </h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="name-input"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="name-input">Name</label>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="location-input"
                          className="form-control"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="location-input">Location</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="country-input"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="country-input">Country</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-outline">
                        <input
                          type="url"
                          id="imageUrl-input"
                          className="form-control"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                        />
                        <label className="form-label" htmlFor="imageUrl-input">Image URL</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                        <input
                          type="number"
                          id="price-input"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="price-input">Price</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-outline">
                      <textarea
                        id="description-input"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        placeholder="Describe the place in detail..."
                      />
                      <label className="form-label" htmlFor="description-input">Description</label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg w-100"
                  >
                    {placeId ? 'Update Place' : 'Create Place'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceForm;