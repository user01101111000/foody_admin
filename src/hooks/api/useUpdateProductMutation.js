import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProduct from "../../service/products/updateProduct";

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", "productsAndRestaurants"]);
    },
  });
}
