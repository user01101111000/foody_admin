import DashboardContainer from "../../containers/dashboard/DashboardContainer";
import useGetAllOrdersAndUsersQuery from "../../hooks/api/useGetAllOrdersAndUsersQuery";
import DashboardLoading from "../../containers/dashboard/DashboardLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllOrdersAndUsersQuery();

  if (isLoading) return <DashboardLoading />;

  if (isError) return <ErrorComponentForReactQuery />;

  const orders = data[0].map((x) => x.fields);
  const users = data[1].map((x) => x.fields);

  return <DashboardContainer orders={orders} users={users} />;
};

export default Dashboard;
