import orderChartDataConverter from "../../utils/dashboard/orderChartDataConverter";

export default function totalSalaryChartDataConverter(data) {
  const restNames = orderChartDataConverter(data).map((x) => x.restaurantName);

  const v1 = data.map((x) => ({
    restaurantName: x.restaurantName.stringValue,
    amount: x.amount.stringValue,
  }));

  const v2 = restNames
    .map((x) => ({
      restaurantName: x,
      totalAmount: v1.reduce(
        (acc, z) => (x == z.restaurantName ? acc + +z.amount : acc),
        0
      ),
    }))
    .sort((a, b) => a.totalAmount - b.totalAmount);

  return v2;
}
