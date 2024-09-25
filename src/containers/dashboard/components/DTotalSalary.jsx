import "../style/DTotalSalary.css";
import { motion } from "framer-motion";
import useWindowSize from "../../../hooks/common/useWindowSize";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function DTotalSalary({ variants, totalSalaryChartData }) {
  const data = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: totalSalaryChartData?.[0]?.restaurantName,
        data: [
          totalSalaryChartData?.[0]?.totalAmount / 2,
          totalSalaryChartData?.[0]?.totalAmount / 1.8,
          totalSalaryChartData?.[0]?.totalAmount / 1.3,
          totalSalaryChartData?.[0]?.totalAmount / 1.1,
          totalSalaryChartData?.[0]?.totalAmount,
        ],
        fill: true,
        backgroundColor: "#914DF0",
        pointBorderColor: "white",
        pointBackgroundColor: "#914DF0",
        borderColor: "white",
      },
      {
        label: totalSalaryChartData?.[1]?.restaurantName,
        data: [
          totalSalaryChartData?.[1]?.totalAmount / 1.5,
          totalSalaryChartData?.[1]?.totalAmount / 1.3,
          totalSalaryChartData?.[1]?.totalAmount / 1.9,
          totalSalaryChartData?.[1]?.totalAmount / 1.1,
          totalSalaryChartData?.[1]?.totalAmount,
        ],
        fill: true,
        backgroundColor: "#3FAEA3",
        pointBorderColor: "white",
        pointBackgroundColor: "#3FAEA3",
        borderColor: "white",
      },

      {
        label: totalSalaryChartData?.[2]?.restaurantName,
        data: [
          totalSalaryChartData?.[2]?.totalAmount / 2.5,
          totalSalaryChartData?.[2]?.totalAmount / 1.9,
          totalSalaryChartData?.[2]?.totalAmount / 1.5,
          totalSalaryChartData?.[2]?.totalAmount / 1.3,
          totalSalaryChartData?.[2]?.totalAmount,
        ],
        fill: true,
        backgroundColor: "#F4A26C",
        pointBorderColor: "white",
        pointBackgroundColor: "#F4A26C",
        borderColor: "white",
      },
    ],
  };

  const { width } = useWindowSize();
  const { t } = useTranslation();

  const config = {
    type: "line",
    options: {
      elements: {
        line: {
          borderWidth: width > 1000 ? 3 : 1,

          borderColor: "rgba(255, 255, 255,1)",
        },
        fill: {
          target: "origin",
          above: "rgb(255, 99, 132)",
          below: "rgb(54, 162, 235)",
        },
      },

      scales: {
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",

            borderDash: [3, 3],
            borderColor: "rgba(255, 255, 255, 0.1)",

            tickColor: "rgba(255, 255, 255, 0.1)",
          },

          title: {
            display: true,
            text: t("Salary"),
            color: "#C7C7C7",
          },
          ticks: {
            color: "#8E8E93",
          },
          axis: "y",
          position: "right",
        },
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            drawOnChartArea: false,
          },
          title: {
            display: true,
            text: t("Years"),
            color: "#C7C7C7",
          },
          ticks: { color: "#8E8E93" },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,

      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            font: {
              family: "Open Sans",
              size: width > 1000 ? 13 : 10,
              weight: "600",
            },
            boxHeight: width < 700 ? 5 : 10,
            boxWidth: width < 700 ? 5 : 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <motion.div className="total_salary_box dash_box" variants={variants}>
      <h1>💰 {t("TotalSalary")}</h1>

      <Line
        data={data}
        options={config.options}
        typeof={config.type}
        plugins={config.plugins}
      />
    </motion.div>
  );
}
