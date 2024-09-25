import { useQuery } from "@tanstack/react-query";
import getOrders from "../../service/orders/getOrders";

export default function useGetAllOrdersQuery() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 300000,
    retry: 1,
  });
}
