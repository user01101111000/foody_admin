import { useMutation, useQueryClient } from "@tanstack/react-query";
import createRestaurant from "../../service/restaurants/createRestaurant";

export default function useCreateRestaurantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "productsAndRestaurants",
        "restaurantsAndCategories",
        "restaurants",
      ]);
    },
  });
}
