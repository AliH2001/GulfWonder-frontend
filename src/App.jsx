import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Footer from './components/Footer/Footer';
import PlaceForm from './components/PlaceForm/PlaceForm';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import * as authService from './services/authService';
import * as placeService from './services/placeService';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddPlace = async (placeData) => {
    try {
      const newPlace = await placeService.create(placeData);
      navigate(`/places/${newPlace.id}`);
      return newPlace;
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  const handleUpdatePlace = async (placeId, placeData) => {
    try {
      const updatedPlace = await placeService.update(placeId, placeData);
      navigate(`/places/${updatedPlace.id}`);
      return updatedPlace;
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/places/:placeId" element={<PlaceDetails />} />
            {user.role === 'admin' && (
              <>
                <Route
                  path="/places/new"
                  element={<PlaceForm handleAddPlace={handleAddPlace} />}
                />
                <Route
                  path="/places/:placeId/edit"
                  element={<PlaceForm handleUpdatePlace={handleUpdatePlace} />}
                />

                
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
};

export default App;