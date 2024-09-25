import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCategory from "../../service/categories/createCategory";

export default function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "restaurantsAndCategories"]);
    },
  });
}
