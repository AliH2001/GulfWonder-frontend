import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlaceList.css";

const PlaceList = ({ places }) => {
  // If places array is empty, show a message
  // if (!places.length) {
  //   return <p className="no-places">No places available.</p>;
  // }

  return (
    <main className="place-list">

      
      {places.map((place) => (
        <div className="place-card-wrapper" key={place._id}>
          <PlaceCard place={place} />
        </div>
      ))}

{/* <div className="tour-cards">
          {places.length > 0 ? (
            places.map((place) => (
              <div className="tour-card" key={place._id}>
                <img src={place.imageUrl || 'https://via.placeholder.com/400x300'} alt={place.name} />
                <h3>{place.name}</h3>
                <p><strong>{place.location}</strong></p>
                <p>${place.price || '99'} per person</p>
              </div>
            ))
          ) : (
            <p>No tours available at the moment.</p>
          )}
        </div> */}
    </main>
  );
};

export default PlaceList;

