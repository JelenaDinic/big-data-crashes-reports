import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Regression } from "../common/models/Regression";
import { getRegressions } from "../services/services";
import ChartCard from "./ChartCard";

const RegressionCard = () => {
    const [regressionData, setRegressionData] = useState<Regression | null>(
        null
    );

    useEffect(() => {
        getRegressions().then((response) => {
            setRegressionData(response);
        });
    }, []);

    const configData = {
        labels: ["Regression"],
        responsive: true,
        offset: true,
        datasets: [
            {
                label: "Speed coefficient",
                data: [regressionData?.speedCoefficient],
                pointStyle: "rectRounded",
                backgroundColor: "#6ED3FF",
                barThickness: 40,
                categoryPercentage: 1,
            },
            {
                label: "Lane count",
                data: [regressionData?.laneCount],
                backgroundColor: "#1497FF",
                barThickness: 40,
                categoryPercentage: 1,
                pointStyle: "triangle",
            },
        ],
    };

    const horizontalChart = <Bar data={configData} />;

    return (
        <>
            <ChartCard
                bg="Light"
                border="success"
                header="Regressions"
                text="Results of linear regression analysis."
                textColor="dark"
                children={horizontalChart}
            />
        </>
    );
};

export default RegressionCard;
