import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChartComponent({ expenses }) {

    const totals = {};

    expenses.forEach(expense => {

        const type = expense.expenseType;

        totals[type] =
            (totals[type] || 0)
            + Number(expense.amount);

    });

    const data = {

        labels: Object.keys(totals),

        datasets: [

            {

                label: "Amount",

                data: Object.values(totals)

            }

        ]

    };

    return <Bar data={data} />;

}

export default BarChartComponent;