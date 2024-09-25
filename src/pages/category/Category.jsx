import CategoryContainer from "../../containers/category/CategoryContainer";
import useGetAllCategoriesQuery from "../../hooks/api/useGetAllCategoriesQuery";
import timeSorter from "../../utils/timeSorter";
import CategoryLoading from "../../containers/category/CategoryLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Category = () => {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) return <CategoryLoading />;
  if (isError) return <ErrorComponentForReactQuery />;

  const categories = timeSorter(data).map((x) => x.fields);

  return <CategoryContainer categories={categories} />;
};

export default Category;
