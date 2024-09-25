export default function orderChartDataConverter(data) {
  return Object.entries(
    data
      .map((x) => x.restaurantName.stringValue)
      .reduce((acc, x) => (acc[x] ? acc[x]++ : (acc[x] = 1), acc), {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((x) => ({ restaurantName: x[0], orderCount: x[1] }));
}
