import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteProduct from "../../service/products/deleteProduct";

export default function useDeleteProductsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", "productsAndRestaurants"]);
    },
  });
}
