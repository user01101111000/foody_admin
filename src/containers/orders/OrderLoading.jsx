import Skeleton from "../../components/skeleton/Skeleton";

const OrderLoading = () => {
  return (
    <div className="orderLoading">
      <Skeleton width="100%" height={80} borderRadius="10px" />
      <Skeleton width="100%" height={450} borderRadius="10px" />
    </div>
  );
};

export default OrderLoading;
