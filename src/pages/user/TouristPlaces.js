import React from "react";
import GlassCard from "../../components/GlassCard";
import "./CSS/TouristPlaces.css";

function TouristPlaces() {
  // List of top tourist places in Mehsana with images & Google Maps queries
  const places = [
    {
      name: "Annapurna Mata Temple, Modipur",
      description: "Famous spiritual temple and annual fair (Melo) in Modipur, visited by thousands.",
      query: "Annapurna Mata Temple, Modipur, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Annapurna.jpeg"
    },
    {
      name: "Modhera Sun Temple",
      description: "Ancient Sun Temple built in 1026–27 CE, great architecture & history.",
      query: "Modhera Sun Temple, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/modhera.png"
    },
    {
      name: "Dharoi Dam & Adventure Fest",
      description: "Dam with water views and adventure activities (parasailing, trekking).",
      query: "Dharoi Dam, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Dharoi.png"
    },
    {
      name: "Thol Lake Bird Sanctuary",
      description: "Birdwatching and nature spot with migratory birds.",
      query: "Thol Lake Bird Sanctuary, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Thol.png"
    },
    {
      name: "Taranga Hills & Temple",
      description: "Scenic hills with ancient temple trails.",
      query: "Taranga Hills, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Taranga.png"
    },
    {
      name: "Kirti Toran, Vadnagar",
      description: "Historic toran (ornamental arch) in Vadnagar.",
      query: "Kirti Toran, Vadnagar, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/KirtiToran.png"
    },
    {
      name: "Sharmishtha Talav",
      description: "Serene historic water tank and regeneration spot.",
      query: "Sharmishtha Talav, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Sharmstha.png"
    },
    {
      name: "Bahuchar Mata Temple, Becharaji",
      description: "Important spiritual temple in Mehsana district.",
      query: "Bahuchar Mata Temple, Becharaji, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Bahucharaji.jpg"
    }
  ];

  return (
    <div className="tep-root">
      <h2 className="tep-title">Top Tourist Places in Mehsana</h2>
      <div className="tep-cards-container">
        {places.map((place, index) => (
          <GlassCard key={index} className="tep-card">
            <img src={place.image} alt={place.name} className="tep-card-img" />
            <div className="tep-card-content">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tep-directions-btn"
              >
                Get Directions
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default TouristPlaces;
