import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Clasters } from "../common/models/Clasters";
import { getClasterStats } from "../services/services";
import ChartCard from "./ChartCard";

const ClastersCard = () => {
    const [clastersData, setClastersData] = useState<Clasters[] | null>(null);

    useEffect(() => {
        getClasterStats().then((response) => {
            setClastersData(response);
        });
    }, []);

    const generateColors = () => {
        let colors = [];
        console.log(clastersData?.length!);
        for (let i = 0; i < clastersData?.length! - 1; i++) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(
                16
            );
            colors.push("#" + randomColor);
        }

        return colors;
    };

    const configData = {
        labels: clastersData?.map((x) => x.firstCrashType),
        datasets: [
            {
                label: "Clusters statistics",
                data: clastersData?.map((x) => x.count),
                backgroundColor: generateColors(),
            },
        ],
    };

    const doughnutChart = (
        <Doughnut data={configData} style={{ marginLeft: "20%" }} />
    );

    return (
        <>
            <ChartCard
                bg="Light"
                border="success"
                header="Clusters statistics"
                text="Crashes devided into clusters. Each cluster represents one crash type."
                textColor="dark"
                children={doughnutChart}
            />
        </>
    );
};

export default ClastersCard;
