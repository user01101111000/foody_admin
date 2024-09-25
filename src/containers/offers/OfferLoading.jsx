import Skeleton from "../../components/skeleton/Skeleton";

const OfferLoading = () => {
  return (
    <div className="offerLoading">
      <Skeleton width="100%" height={80} borderRadius="10px" />
      <Skeleton width="100%" height={450} borderRadius="10px" />
    </div>
  );
};

export default OfferLoading;
