import { useQuery } from "@tanstack/react-query";
import getProducts from "../../service/products/getProducts";
import getRestaurants from "../../service/restaurants/getRestaurants";

export default function useGetAllProductsAndRestaurantsQuery() {
  return useQuery({
    queryKey: ["productsAndRestaurants"],
    queryFn: async () => {
      const data = await Promise.all([getProducts(), getRestaurants()]);

      return data;
    },
    staleTime: 300000,
    retry: 1,
  });
}
