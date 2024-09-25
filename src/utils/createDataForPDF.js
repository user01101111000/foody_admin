import orderChartDataConverter from "../utils/dashboard/orderChartDataConverter";
import genderChartDataConverter from "../utils/dashboard/genderChartDataConverter";
import popularProductsChartDataConverter from "../utils/dashboard/popularProductsChartDataConverter";
import totalSalaryChartDataConverter from "../utils/dashboard/totalSalaryChartDataConverter";

import getOrders from "../service/orders/getOrders";
import getUsers from "../service/users/getUsers";

export default async function createDataForPDF() {
  const data1 = await getOrders();
  const data2 = await getUsers();

  const orders = data1.map((x) => x.fields);
  const users = data2.map((x) => x.fields);

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

  return pdfData;
}
