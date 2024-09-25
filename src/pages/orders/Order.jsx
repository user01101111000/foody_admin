import OrderContainer from "../../containers/orders/OrderContainer";
import useGetAllOrdersQuery from "../../hooks/api/useGetAllOrdersQuery";
import timeSorter from "../../utils/timeSorter";
import OrderLoading from "../../containers/orders/OrderLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Order = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <OrderLoading />;

  if (isError) return <ErrorComponentForReactQuery />;

  const orders = timeSorter(data).map((x) => x.fields);

  return <OrderContainer orders={orders} />;
};

export default Order;
