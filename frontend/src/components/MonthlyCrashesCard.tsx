import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
} from "chart.js";
import { ReactNode, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getMonthlyCrashes } from "../services/services";
import ChartCard from "./ChartCard";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const MonthlyCrashesCard = () => {
    const [monthlyCrashesCount, setMonthlyCrashesCount] = useState<
        number[] | null
    >(null);

    useEffect(() => {
        getMonthlyCrashes().then((response) => {
            setMonthlyCrashesCount(response);
        });
    }, []);

    const configData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "# of Crashes /month",
                data: monthlyCrashesCount ?? [],
                borderWidth: 1,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
            },
        ],
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    const barChart: ReactNode = <Bar data={configData} />;

    return (
        <>
            <ChartCard
                bg="Light"
                border="success"
                header="Monthly crashes statistics"
                text="Statistics results on how many crashes are reported in each month."
                textColor="dark"
                children={barChart}
            />
        </>
    );
};

export default MonthlyCrashesCard;
