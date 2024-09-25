import Skeleton from "../../components/skeleton/Skeleton";

const DashboardLoading = () => {
  return (
    <div className="Dashboard">
      <Skeleton gridArea="a" borderRadius="10px" />
      <Skeleton gridArea="b" borderRadius="10px" />
      <Skeleton gridArea="c" borderRadius="10px" />
      <Skeleton gridArea="d" borderRadius="10px" />
    </div>
  );
};

export default DashboardLoading;
