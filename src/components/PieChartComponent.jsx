import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChartComponent({ expenses }) {

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

                label: "Expenses",

                data: Object.values(totals)

            }

        ]

    };

    return <Pie data={data} />;

}

export default PieChartComponent;