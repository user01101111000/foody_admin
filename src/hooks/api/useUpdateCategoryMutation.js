import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCategory from "../../service/categories/updateCategory";

export default function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "restaurantsAndCategories"]);
    },
  });
}
