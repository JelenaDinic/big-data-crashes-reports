import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { MAP_API_KEY } from "../common/keys";
import { Coordinates } from "../common/models/Coordinates";
import { getCoordinates } from "../services/services";

const MapChart = () => {
    const [coordinates, setCoordinates] = useState<Coordinates[] | null>(null);

    useEffect(() => {
        getCoordinates().then((response) => {
            setCoordinates(response);
        });
    }, []);

    const mapStyles = {
        height: "400px",
        width: "100%",
    };

    return (
        <LoadScript googleMapsApiKey={MAP_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={{ lat: 41.881832, lng: -87.623177 }}
            >
                {coordinates?.map((coord, index) => (
                    <Marker
                        key={index}
                        position={{ lat: coord.latitude, lng: coord.longitude }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapChart;
