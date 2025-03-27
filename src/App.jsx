import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Footer from './components/Footer/Footer';
import * as authService from './services/authService';
import * as placeService from './services/placeService';
import PlaceCard from './components/PlaceCard/PlaceCard';
import PlaceList from './components/PlaceList/PlaceList';
import PlaceForm from './components/PlaceForm/PlaceForm';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import About from './components/About/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const placesData = await placeService.index();
      setPlaces(placesData);
    };
    if (user) fetchAllPlaces();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate('/');
  };

  const handleAddPlace = async (placeFormData) => {
    const newPlace = await placeService.create(placeFormData);
    setPlaces(prev => [newPlace, ...prev]);
    navigate('/places');
  };

  const handleUpdatePlace = async (placeId, placeFormData) => {
    const updatedPlace = await placeService.update(placeId, placeFormData);
    setPlaces(prev => prev.map(place => 
      place._id === placeId ? updatedPlace : place
    ));
    navigate(`/places/${placeId}`);
  };

  const handleDeletePlace = async (placeId) => {
    await placeService.deletePlace(placeId);
    setPlaces(prev => prev.filter(place => place._id !== placeId));
    navigate('/places');
  };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>

        <Route path="/" element={<Landing user={user} />} />
        <Route path="/about" element={<About />} />

        {user ? (
          <>
            <Route path="/places" element={<PlaceList places={places} />} />
            <Route path="/places/:placeId" element={<PlaceDetails user={user} handleDeletePlace={handleDeletePlace} />} />
            {user.role === 'admin' && (
              <>
                <Route path="/places/new" element={<PlaceForm handleAddPlace={handleAddPlace} />} />
                <Route path="/places/:placeId/edit" element={<PlaceForm handleUpdatePlace={handleUpdatePlace} />} />
              </>
            )}
          </>
        ) : (
          <Route path="/places" element={<Landing user={user} />} />
        )}

        {/* Auth Routes */}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
