import "../style/DOrders.css";
import useWindowSize from "../../../hooks/common/useWindowSize";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DOrders({ variants, orderChartData }) {
  const { width } = useWindowSize();
  const { t } = useTranslation();

  const data = {
    labels: orderChartData?.map((x) => x?.restaurantName),
    datasets: [
      {
        label: "Orders",
        data: orderChartData?.map((x) => x?.orderCount),

        backgroundColor: ["#914DF0", "#3FAEA3", "#F4A26C"],
        hoverOffset: 4,
      },
    ],
  };

  const responsiveValue = width < 1154 ? 2.6 : 2.4;

  const config = {
    type: "doughnut",
    options: {
      cutout: "70%",
      borderWidth: 5,
      borderColor: "#27283C",
      hoverBorderWidth: 3,

      maintainAspectRatio: false,
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
          },
        },
      },
    },
    plugins: [
      {
        beforeDraw: function (chart) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
          ctx.restore();
          var fontSize = (height / 320).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "top";
          ctx.fillStyle = "rgba(255,255,255,0.5)";

          var text = t("ProjectByAccount"),
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / responsiveValue;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ],
  };

  return (
    <motion.div className="orders_box dash_box" variants={variants}>
      <h1>📋 {t("Orders")}</h1>
      <Doughnut
        id="doughnut"
        typeof={config.type}
        data={data}
        options={config.options}
        plugins={config.plugins}
      />
    </motion.div>
  );
}
