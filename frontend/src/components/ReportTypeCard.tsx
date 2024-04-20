import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { ReactNode, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { recordsTotal } from "../common/constants";
import { ReportType } from "../common/models/OnSceneData";
import { getOnScenes } from "../services/services";
import ChartCard from "./ChartCard";
import "./ComponentsStyle.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportTypeCard = () => {
    const [reportData, setReportData] = useState<ReportType | null>(null);

    useEffect(() => {
        getOnScenes().then((response) => {
            const onScenePercentage = (response / recordsTotal) * 100;
            setReportData({
                onScene: onScenePercentage,
                onDesk: 100 - onScenePercentage,
            });
        });
    }, []);

    const configData = {
        labels: ["On Desk", "On Scene"],
        datasets: [
            {
                label: "Report types (%)",
                data: [reportData?.onDesk, reportData?.onScene],
                backgroundColor: ["rgba(123, 227, 150)", "rgba(232, 179, 114)"],
            },
        ],
    };

    const pieChart: ReactNode = (
        <Pie data={configData} style={{ marginLeft: "20%" }} />
    );

    return (
        <>
            <ChartCard
                bg="light"
                border="success"
                header="Report types statistics"
                text="Statistics result of how many crashes were reported on scene."
                textColor="dark"
                children={pieChart}
            />
        </>
    );
};

export default ReportTypeCard;
