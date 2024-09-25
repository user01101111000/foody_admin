import { useQuery } from "@tanstack/react-query";
import getCategories from "../../service/categories/getCategories";

export default function useGetAllCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 300000,
    retry: 1,
  });
}
