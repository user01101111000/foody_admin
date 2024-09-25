import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import createPdf from "../../../utils/createPdf";
import createDataForPDF from "../../../utils/createDataForPDF";

const PDFComp = ({ t }) => {
  return (
    <section className="pdfComp">
      <p className="pdfDesc">{t("PDFCOMPTEXT")}</p>

      <button
        className="downloadPDFButton"
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
                await createPdf(await createDataForPDF());

                Swal.fire({
                  title: t("downloadText3"),
                  text: t("downloadText4"),
                  confirmButtonText: t("ok"),
                  icon: "success",
                });
              }
            });
        }}
      >
        {t("Download PDF")}
      </button>
    </section>
  );
};

export default PDFComp;
