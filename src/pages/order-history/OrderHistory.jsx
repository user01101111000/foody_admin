import OrderHistoryContainer from "../../containers/order-history/OrderHistory";
import useGetAllOrdersQuery from "../../hooks/api/useGetAllOrdersQuery";
import timeSorter from "../../utils/timeSorter";
import OrderHLoading from "../../containers/order-history/OrderHLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const OrderHistory = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <OrderHLoading />;

  if (isError) return <ErrorComponentForReactQuery />;

  const orders = timeSorter(data).map((x) => x.fields);

  return <OrderHistoryContainer orders={orders} />;
};

export default OrderHistory;
