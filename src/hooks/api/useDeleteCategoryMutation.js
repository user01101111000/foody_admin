import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCategory from "../../service/categories/deleteCategory";

export default function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "restaurantsAndCategories"]);
    },
  });
}
