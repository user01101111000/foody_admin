import { useQuery } from "@tanstack/react-query";
import getOrders from "../../service/orders/getOrders";
import getUsers from "../../service/users/getUsers";

export default function useGetAllOrdersAndUsersQuery() {
  return useQuery({
    queryKey: ["ordersAndUsers"],
    queryFn: async () => {
      const data = await Promise.all([getOrders(), getUsers()]);

      return data;
    },
    staleTime: 300000,
    retry: 1,
  });
}
