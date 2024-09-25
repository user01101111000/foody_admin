import { useMutation, useQueryClient } from "@tanstack/react-query";
import createProduct from "../../service/products/createProduct";

export default function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", "productsAndRestaurants"]);
    },
  });
}
