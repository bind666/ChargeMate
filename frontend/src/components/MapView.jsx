import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "../utils/axios";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = () => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        axios.get("/stations").then((res) => {
            setStations(res.data.data);
        });
    }, []);

    return (
        <MapContainer
            center={[20.5937, 78.9629]} // Center of India
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stations.map((station) => (
                <Marker
                    key={station._id}
                    position={[
                        parseFloat(station.location.latitude),
                        parseFloat(station.location.longitude),
                    ]}
                >
                    <Popup>
                        <h2 className="font-bold">{station.name}</h2>
                        <p>Status: {station.status}</p>
                        <p>Power: {station.powerOutput} kW</p>
                        <p>Connector: {station.connectorType}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
