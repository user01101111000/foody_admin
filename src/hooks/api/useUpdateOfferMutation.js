import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateOffer from "../../service/offers/updateOffer";

export default function useUpdateOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
  });
}
