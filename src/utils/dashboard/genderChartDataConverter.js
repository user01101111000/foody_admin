export default function genderChartDataConverter(data) {
  return Object.entries(
    data
      .map((user) => user.gender.stringValue)
      .reduce((acc, x) => (acc[x] ? acc[x]++ : (acc[x] = 1), acc), {})
  ).map((x) => ({ gender: x[0], count: x[1] }));
}
