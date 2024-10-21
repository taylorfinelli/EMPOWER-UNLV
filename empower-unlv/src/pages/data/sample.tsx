import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface City {
  name: string;
  coordinates: [number, number];
}

const cities: City[] = [
  { name: "New York", coordinates: [40.7128, -74.006] },
  { name: "Los Angeles", coordinates: [34.0522, -118.2437] },
  { name: "Chicago", coordinates: [41.8781, -87.6298] },
  { name: "Houston", coordinates: [29.7604, -95.3698] },
];

const Data: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = cities.find((city) => city.name === event.target.value);
    setSelectedCity(city);
  };

  return (
    <div>
      <select onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedCity && <FlyToMarker position={selectedCity.coordinates} />}
      </MapContainer>
    </div>
  );
};

const FlyToMarker: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();

  React.useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  }, [position, map]);

  return null; // You can add a marker here if needed
};

export default Data;
