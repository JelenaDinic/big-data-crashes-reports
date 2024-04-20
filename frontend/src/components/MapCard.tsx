import ChartCard from "./ChartCard";
import MapChart from "./MapChart";

const MapCard = () => {
    const mapChart = <MapChart />;

    return (
        <>
            <ChartCard
                bg="Light"
                border="success"
                header="Geographic representation of crash places"
                text="The geographic representation of crash places in Chicago highlighted critical areas prone to traffic accidents, guiding targeted safety interventions. Advanced mapping technologies facilitated the visualization of crash hotspots, enabling informed decision-making for city planners and law enforcement agencies."
                textColor="dark"
                children={mapChart}
            />
        </>
    );
};

export default MapCard;
