import { useQuery } from "@tanstack/react-query";
import getCategories from "../../service/categories/getCategories";
import getRestaurants from "../../service/restaurants/getRestaurants";

export default function useGetAllRestaurantsAndCategoriesQuery() {
  return useQuery({
    queryKey: ["restaurantsAndCategories"],
    queryFn: async () => {
      const data = await Promise.all([getRestaurants(), getCategories()]);

      return data;
    },
    staleTime: 300000,
    retry: 1,
  });
}
