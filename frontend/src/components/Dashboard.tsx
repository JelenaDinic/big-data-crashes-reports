import { useState } from "react";
import { Container } from "react-bootstrap";
import Logo from "../assets/logo.png";
import ClastersCard from "./ClastersCard";
import "./ComponentsStyle.css";
import DashboardDropdown from "./DashboardDropdown";
import MapCard from "./MapCard";
import MonthlyCrashesCard from "./MonthlyCrashesCard";
import RegressionCard from "./RegressionCard";
import ReportTypeCard from "./ReportTypeCard";
import SingleCrashCard from "./SingleCrashCard";

const Dashboard = () => {
    const [selectedCard, setSelectedCard] = useState<string>("report-type");

    const renderCard = () => {
        let renderedCard;

        switch (selectedCard) {
            case "report-type":
                renderedCard = <ReportTypeCard />;
                break;
            case "monthly-crashes":
                renderedCard = <MonthlyCrashesCard />;
                break;
            case "map-crashes":
                renderedCard = <MapCard />;
                break;
            case "single-crash":
                renderedCard = <SingleCrashCard />;
                break;
            case "clasters":
                renderedCard = <ClastersCard />;
                break;
            case "regression":
                renderedCard = <RegressionCard />;
                break;
            default:
                break;
        }

        return renderedCard;
    };

    return (
        <div>
            <div className="navbar">
                <img src={Logo} alt="logo" />
                <h1 className="dashboard_header">
                    Distributed Systems in smart cities - Chicago
                </h1>
            </div>

            <DashboardDropdown setSelectedCard={setSelectedCard} />

            <Container className="container">
                <div className="card_wrapper">{renderCard()}</div>
            </Container>
        </div>
    );
};

export default Dashboard;
