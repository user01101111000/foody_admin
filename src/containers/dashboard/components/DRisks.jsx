import "../style/DRisks.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js/auto";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DRisks({ variants, popularProductsChartData }) {
  const { t } = useTranslation();

  const config = {
    type: "bar",
    data: {
      labels: [...popularProductsChartData?.map((x) => x?.productName)],

      datasets: [
        {
          axis: "y",

          data: [...popularProductsChartData?.map((x) => x?.count)],
          fill: false,
          backgroundColor: [
            "#914DF0",
            "#3FAEA3",
            "#F4A26C",
            "#EB5757",
            "#2D9CDB",
          ],
          borderColor: ["#914DF0", "#3FAEA3", "#F4A26C", "#EB5757", "#2D9CDB"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },

        title: {
          display: false,
        },
      },

      elements: {
        bar: {
          borderWidth: 5,
        },
      },

      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",

            borderColor: "rgba(255, 255, 255, 0.1)",

            tickColor: "rgba(255, 255, 255, 0.1)",
          },
        },

        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",

            borderColor: "rgba(255, 255, 255, 0.1)",

            tickColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  };

  return (
    <motion.div className="risks_box dash_box" variants={variants}>
      <h1>📦 {t("AssignedRisks")}</h1>
      <Bar data={config.data} typeof={config.type} options={config.options} />
    </motion.div>
  );
}
