import RestaurantContainer from "../../containers/restaurants/RestaurantsContainer";
import useGetAllRestaurantsAndCategoriesQuery from "../../hooks/api/useGetAllRestaurantsAndCategoriesQuery";
import timeSorter from "../../utils/timeSorter";
import RestaurantsLoading from "../../containers/restaurants/RestaurantsLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Restaurant = () => {
  const { data, isLoading, isError } = useGetAllRestaurantsAndCategoriesQuery();

  if (isLoading) return <RestaurantsLoading />;

  if (isError) return <ErrorComponentForReactQuery />;

  const restaurants = timeSorter(data[0]).map((x) => x.fields);

  const categories = data[1].map((x) => x.fields.name.stringValue);

  return (
    <RestaurantContainer restaurants={restaurants} categories={categories} />
  );
};

export default Restaurant;
