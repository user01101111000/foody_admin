import Skeleton from "../../components/skeleton/Skeleton";

const ProductsLoading = () => {
  return (
    <div className="productsLoading">
      <Skeleton width="100%" height={"6rem"} borderRadius="10px" />

      <div className="productList">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={i} width="12rem" height="14rem" borderRadius="10px" />
        ))}
      </div>
    </div>
  );
};

export default ProductsLoading;
