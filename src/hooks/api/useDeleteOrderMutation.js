import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteOrder from "../../service/orders/deleteOrder";

export default function useDeleteOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", "ordersAndUsers"]);
    },
  });
}
