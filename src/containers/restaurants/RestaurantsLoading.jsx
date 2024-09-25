import Skeleton from "../../components/skeleton/Skeleton";

const RestaurantsLoading = () => {
  return (
    <div className="restaurantsLoading">
      <Skeleton width="100%" height={"6rem"} borderRadius="10px" />
      <Skeleton width="100%" height={"6rem"} borderRadius="10px" />

      <div className="restaurantList">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={i} width="15rem" height="7rem" borderRadius="10px" />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsLoading;
