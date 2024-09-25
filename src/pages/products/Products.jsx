import ProductsContainer from "../../containers/products/ProductsContainer";
import useGetAllProductsAndRestaurantsQuery from "../../hooks/api/useGetAllProductsAndRestaurantsQuery";
import timeSorter from "../../utils/timeSorter";
import ProductsLoading from "../../containers/products/ProductsLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProductsAndRestaurantsQuery();

  if (isLoading) return <ProductsLoading />;
  if (isError) return <ErrorComponentForReactQuery />;

  const products = timeSorter(data[0]).map((x) => x.fields);

  const restaurants = data[1].map((x) => x.fields.name.stringValue);

  return <ProductsContainer products={products} restaurants={restaurants} />;
};

export default Products;
