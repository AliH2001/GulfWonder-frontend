import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlaceList.css";

const PlaceList = ({ places }) => {

  return (
    <main className="place-list">

      {places.map((place) => (
        <div className="place-card-wrapper" key={place._id}>
          <PlaceCard place={place} />
        </div>
      ))}


    </main>
  );
};

export default PlaceList;

