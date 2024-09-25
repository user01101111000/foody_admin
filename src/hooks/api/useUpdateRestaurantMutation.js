import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateRestaurant from "../../service/restaurants/updateRestaurant";

export default function useUpdateRestaurantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "productsAndRestaurants",
        "restaurantsAndCategories",
        "restaurants",
      ]);
    },
  });
}
