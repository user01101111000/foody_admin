import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";
import { format } from "date-fns";

const curDateAndTime =
  format(new Date(), "dd.MM.yyyy") + ", " + format(new Date(), "HH:mm:ss");

export default async function createPdf(data) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanFontBold = await pdfDoc.embedFont(
    StandardFonts.TimesRomanBold
  );
  const pngUrl = "/pdfImages/foody-logo.png";
  const signature = "/pdfImages/signature.png";
  const stamp = "/pdfImages/stamp.png";
  const qrCode = "/pdfImages/eacamp_qrCode.png";

  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
  const stampBytes = await fetch(stamp).then((res) => res.arrayBuffer());
  const signatureBytes = await fetch(signature).then((res) =>
    res.arrayBuffer()
  );
  const qrCodeBytes = await fetch(qrCode).then((res) => res.arrayBuffer());

  const stampImage = await pdfDoc.embedPng(stampBytes);
  const signatureImage = await pdfDoc.embedPng(signatureBytes);
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);

  const pngDims = pngImage.scale(1);
  const signatureDims = signatureImage.scale(0.2);
  const stampDims = stampImage.scale(0.4);
  const qrCodeDims = qrCodeImage.scale(0.3);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawImage(stampImage, {
    x: width / 1.7,
    y: height - 280,
    width: stampDims.width,
    height: stampDims.height,
  });

  page.drawImage(pngImage, {
    x: width / 2.5,
    y: height - 50,
    width: pngDims.width,
    height: pngDims.height,
  });

  page.drawText("Genders :", {
    x: 20,
    y: height - 80,
    size: 18,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  data[0].forEach((element, i) => {
    page.drawText(
      element.gender[0].toUpperCase() +
        element.gender.slice(1) +
        " : " +
        element.count,
      {
        x: 20,
        y: height - 110 - i * 20,
        size: 18,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      }
    );
  });

  page.drawText(
    "____________________________________________________________",
    {
      x: 20,
      y: height - 170,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("Orders :", {
    x: 20,
    y: height - 200,
    size: 18,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  data[1].forEach((order, i) => {
    page.drawText(order.restaurantName + " : " + order.orderCount, {
      x: 20,
      y: height - 230 - i * 20,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
  });

  page.drawText(
    "____________________________________________________________",
    {
      x: 20,
      y: height - 230 - data[1].length * 20,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("Total Salary :", {
    x: 20,
    y: height - 260 - data[1].length * 20,
    size: 18,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  data[2].forEach((element, i) => {
    page.drawText(element.restaurantName + " : " + element.totalAmount + " $", {
      x: 20,
      y: height - 290 - data[1].length * 20 - i * 20,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
  });

  page.drawText(
    "____________________________________________________________",
    {
      x: 20,
      y: height - 290 - data[1].length * 20 - data[2].length * 20,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("Popular Products :", {
    x: 20,
    y: height - 320 - data[1].length * 20 - data[2].length * 20,
    size: 18,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  data[3].forEach((element, i) => {
    page.drawText(element.productName + " : " + element.count, {
      x: 20,
      y: height - 350 - data[1].length * 20 - data[2].length * 20 - i * 20,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
  });

  page.drawText(
    "This document contains information about Foody's real-time orders, gender, total salary \n and popular products sections. Created by ADMIN.",
    {
      x: 20,
      y:
        height -
        390 -
        data[1].length * 20 -
        data[2].length * 20 -
        data[3].length * 20,
      size: 15,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("Time : " + curDateAndTime, {
    x: 20,
    y:
      height -
      500 -
      data[1].length * 20 -
      data[2].length * 20 -
      data[3].length * 20,
    size: 15,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawImage(qrCodeImage, {
    x: 13,
    y:
      height -
      600 -
      data[1].length * 20 -
      data[2].length * 20 -
      data[3].length * 20,

    width: qrCodeDims.width,
    height: qrCodeDims.height,
  });

  page.drawText("ADMIN : ", {
    x: width / 2,
    y:
      height -
      500 -
      data[1].length * 20 -
      data[2].length * 20 -
      data[3].length * 20,
    size: 15,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawImage(signatureImage, {
    x: width / 1.5,
    y:
      height -
      550 -
      data[1].length * 20 -
      data[2].length * 20 -
      data[3].length * 20,
    width: signatureDims.width,
    height: signatureDims.height,
  });

  const pdfBytes = await pdfDoc.save();

  download(pdfBytes, "foody-report.pdf", "application/pdf");
}
