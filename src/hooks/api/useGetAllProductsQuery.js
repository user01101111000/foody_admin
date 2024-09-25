import { useQuery } from "@tanstack/react-query";
import getProducts from "../../service/products/getProducts";

export default function useGetAllProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 300000,
    retry: 1,
  });
}
