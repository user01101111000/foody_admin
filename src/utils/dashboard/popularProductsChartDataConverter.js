export default function popularProductsChartDataConverter(data) {
  const baskets = data.map((x) => x.basket.arrayValue.values);

  const popularProductsChartData = Object.entries(
    baskets
      .flat()
      .map((x) => x.mapValue.fields)
      .reduce(
        (acc, x) => (
          acc[x.name.stringValue]
            ? (acc[x.name.stringValue] =
                acc[x.name.stringValue] + +x.quantity.stringValue)
            : (acc[x.name.stringValue] = +x.quantity.stringValue),
          acc
        ),
        {}
      )
  )

    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((x) => ({ productName: x[0], count: x[1] }));

  return popularProductsChartData;
}
