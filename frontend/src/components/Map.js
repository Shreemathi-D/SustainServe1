import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // ✅ Import Leaflet styles

// ✅ Fix missing marker icons issue in Leaflet
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// ✅ Define a custom marker icon
const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/donations/map")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);

  return (
    <div className="map-container">
      <h2 className="map-title">Food Donation Locations</h2>
      <MapContainer center={[13.0827, 80.2707]} zoom={10} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {donations.map((donation, index) => (
          <Marker
            key={index}
            position={[donation.latitude, donation.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <b>{donation.name}</b> <br />
              {donation.location} <br />
              Contact: {donation.contact}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
