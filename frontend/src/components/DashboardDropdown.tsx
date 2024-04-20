import { Dispatch, SetStateAction } from "react";
import { Dropdown } from "react-bootstrap";
import "./ComponentsStyle.css";

interface DashboardDropdownProps {
    setSelectedCard: Dispatch<SetStateAction<string>>;
}

const DashboardDropdown = ({ setSelectedCard }: DashboardDropdownProps) => {
    return (
        <Dropdown className="dash_dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Choose stats chart to display
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCard("report-type")}>
                    Report type
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => setSelectedCard("monthly-crashes")}
                >
                    Monthly crashes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCard("map-crashes")}>
                    Map crashes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCard("single-crash")}>
                    Single crash
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCard("clasters")}>
                    Clasters
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCard("regression")}>
                    Regressions
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DashboardDropdown;
