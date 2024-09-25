import { useQuery } from "@tanstack/react-query";
import getRestaurants from "../../service/restaurants/getRestaurants";

export default function useGetAllRestaurantsQuery() {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
    staleTime: 300000,
    retry: 1,
  });
}
