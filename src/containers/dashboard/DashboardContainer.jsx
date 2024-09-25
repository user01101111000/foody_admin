import "./Dashboard.css";
import DActionItems from "./components/DActionItems";
import DOrders from "./components/DOrders";
import DRisks from "./components/DRisks";
import DTotalSalary from "./components/DTotalSalary";
import { motion } from "framer-motion";
import { container, item } from "../../utils/framerMotionVariables";
import { FaFileDownload } from "react-icons/fa";
import createPdf from "../../utils/createPdf";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";

import orderChartDataConverter from "../../utils/dashboard/orderChartDataConverter";
import genderChartDataConverter from "../../utils/dashboard/genderChartDataConverter";
import popularProductsChartDataConverter from "../../utils/dashboard/popularProductsChartDataConverter";
import totalSalaryChartDataConverter from "../../utils/dashboard/totalSalaryChartDataConverter";

export default function DashboardContainer({ orders, users }) {
  const orderChartData = orderChartDataConverter(orders);
  const genderChartData = genderChartDataConverter(users);

  const popularProductsChartData = popularProductsChartDataConverter(orders);
  const totalSalaryChartData = totalSalaryChartDataConverter(orders);

  const pdfData = [
    genderChartData,
    orderChartData,
    totalSalaryChartData,
    popularProductsChartData,
  ];

  const { t } = useTranslation();

  return (
    <section className="Dashboard_wrapper">
      <motion.article
        className="Dashboard"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <DOrders variants={item} orderChartData={orderChartData} />
        <DTotalSalary
          variants={item}
          totalSalaryChartData={totalSalaryChartData}
        />

        <DRisks
          variants={item}
          popularProductsChartData={popularProductsChartData}
        />

        <DActionItems variants={item} genderChartData={genderChartData} />
      </motion.article>

      <motion.button
        className="download_pdf"
        onClick={() => {
          withReactContent(Swal)
            .fire({
              title: t("downloadText1"),
              text: t("downloadText2"),
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#305cde",
              cancelButtonColor: "#d33",
              confirmButtonText: t("download"),
              cancelButtonText: t("Cancel"),
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await createPdf(pdfData);

                Swal.fire({
                  title: t("downloadText3"),
                  text: t("downloadText4"),
                  confirmButtonText: t("ok"),
                  icon: "success",
                });
              }
            });
        }}
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 0.9, rotate: 360 }}
      >
        <FaFileDownload className="download_pdf_icon" />
      </motion.button>
    </section>
  );
}
