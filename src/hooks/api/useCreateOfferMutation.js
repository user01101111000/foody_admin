import { useMutation, useQueryClient } from "@tanstack/react-query";
import createOffer from "../../service/offers/createOffer";

export default function useCreateOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
  });
}
