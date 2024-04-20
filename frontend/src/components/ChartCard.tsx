import { ReactNode } from "react";
import { Card } from "react-bootstrap";
import "./ComponentsStyle.css";

interface ChartCardProps {
    bg: string;
    border: string;
    textColor: "white" | "dark";
    header: string;
    text: string;
    children: ReactNode;
}

const ChartCard = ({
    bg,
    border,
    header,
    textColor,
    text,
    children,
}: ChartCardProps) => {
    return (
        <>
            <Card
                bg={bg.toLowerCase()}
                border={border.toLowerCase()}
                key={bg}
                text={textColor}
                className="card"
            >
                <Card.Header className="card_header">{header}</Card.Header>
                <Card.Body>
                    <Card.Text className="card_text">{text}</Card.Text>
                    <div className="card_content">{children}</div>
                </Card.Body>
            </Card>
        </>
    );
};

export default ChartCard;
