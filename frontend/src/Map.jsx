import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from './assets/loc.png'; 

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const Map = ({ selectedLocation }) => {
    const defaultCenter = selectedLocation
        ? [selectedLocation.lat, selectedLocation.lon]
        : [20.5937, 78.9629]; // Default to India

    return (
        <MapContainer center={defaultCenter} zoom={selectedLocation ? 13 : 4} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedLocation && (
                <Marker
                    position={[selectedLocation.lat, selectedLocation.lon]}
                    icon={customIcon}
                >
                    <Popup>
                        {selectedLocation.name} — {selectedLocation.location}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
