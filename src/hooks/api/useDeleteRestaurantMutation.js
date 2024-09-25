import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteRestaurant from "../../service/restaurants/deleteRestaurant";

export default function useDeleteRestaurantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "restaurants",
        "productsAndRestaurants",
        "restaurantsAndCategories",
      ]);
    },
  });
}
