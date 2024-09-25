import "../style/DActionItems.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Title,
} from "chart.js/auto";
import useWindowSize from "../../../hooks/common/useWindowSize";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title);

export default function DActionItems({ variants, genderChartData }) {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const config = {
    type: "polarArea",
    data: {
      labels: [t("Male"), t("Female"), t("Other")],

      datasets: [
        {
          label: "Gender count",

          fill: false,

          axis: "y",
          data: [
            genderChartData.find((x) => x?.gender == "male")?.count,
            genderChartData.find((x) => x?.gender == "female")?.count,
            genderChartData.find((x) => x?.gender == "other")?.count,
          ],

          backgroundColor: [
            "rgba(64, 159, 255,0.2)",
            "rgba(255, 54, 54,0.2)",
            "rgba(255, 242, 54,0.2)",
          ],
          borderColor: [
            "rgb(64, 159, 255,0.5)",
            "rgb(255, 54, 54,0.5)",
            "rgb(255, 242, 54,0.5)",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,

      scales: {
        r: {
          ticks: {
            backdropColor: "rgba(0, 0, 0, 0.1)",
            color: "rgba(255, 255, 255, 0.5)",

            font: {
              size: 12,
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },

      plugins: {
        legend: {
          labels: {
            textAlign: "center",

            color: "rgba(255, 255, 255, 0.5)",

            font: {
              size: 12,
            },
            usePointStyle: true,
            boxHeight: width < 700 ? 5 : 10,
            boxWidth: width < 700 ? 5 : 10,

            pointStyle: "circle",

            padding: 20,
          },
        },
      },
    },
  };
  return (
    <motion.div className="action_items_box dash_box" variants={variants}>
      <h1>⚧ {t("AssignedActionItems")}</h1>

      <PolarArea
        typeof={config.type}
        options={config.options}
        data={config.data}
      />
    </motion.div>
  );
}
