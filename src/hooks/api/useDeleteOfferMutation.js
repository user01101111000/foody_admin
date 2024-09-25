import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteOffer from "../../service/offers/deleteOffer";

export default function useDeleteOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
  });
}
