const timeSorter = (arr = []) =>
  arr.sort(
    (a, b) =>
      new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
  );

export default timeSorter;
