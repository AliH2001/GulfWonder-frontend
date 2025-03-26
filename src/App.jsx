import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Footer from './components/Footer/Footer';

//services
import * as authService from './services/authService';
import * as placeService from './services/placeService';

//COMPONENTS
import PlaceCard from './components/PlaceCard/PlaceCard';
import PlaceList from './components/PlaceList/PlaceList';
import PlaceForm from './components/PlaceForm/PlaceForm';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import About from './components/About/About';



// export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const placesData = await placeService.index();
      
      setPlaces(placesData)
     

    }

    if (user) fetchAllPlaces()

    
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddPlace = async (placeFormData) => {
      const newPlace = await placeService.create(placeFormData);
      const newPlaceList = [ newPlace, ...places ];
      setPlaces([newPlace, ...places]); 
      navigate(`/places`);
  };


  const handleUpdatePlace = async (placeId, placeFormData) => {
  const updatedPlace = await placeService .update(placeId, placeFormData);
  console.log(updatedPlace);
  setPlaces(places.map((place) => (placeId === place._id ? updatedPlace : place)));
  navigate(`/places/${placeId}`);
};


  const handleDeletePlace = async (placeId) => {
    const deletedPlace = await placeService.deletePlace(placeId);
    setPlaces(places.filter(place => place._id !== deletedplace._id));
    navigate('/places');
  };


  return (
    <>
      {/* <AuthedUserContext.Provider value={user}> */}
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
      <Route path="/places" element={<PlaceList places={places}/>} />
        {user ? (
          <>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/places/:placeId" element={<PlaceDetails user={user} />} />
            {/* <Route path="/places" element={<PlaceList places={places}/>} /> */}
            <Route path="/about" element={<About />} />/
            {user.role === 'admin' && (
              <>
                <Route path="/places/new" element={<PlaceForm handleAddPlace={handleAddPlace} />}/>
                <Route path="/places/:placeId/edit" element={<PlaceForm handleUpdatePlace={handleUpdatePlace} />}/>
                {/* <Route path="/places" element={<PlaceList  />} /> */}
              </>
            )}
          </>
        ) : (

          <>
            <Route path="/" element={<Landing />} />
          </>
        )}
         <Route path="/signup" element={<SignupForm setUser={setUser} />} />
         <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
      {/* </AuthedUserContext.Provider> */}
      <Footer />
    </>
  );
};

export default App;