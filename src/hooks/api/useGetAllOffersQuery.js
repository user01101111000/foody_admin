import { useQuery } from "@tanstack/react-query";
import getOffers from "../../service/offers/getOffers";

export default function useGetAllOffersQuery() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
    staleTime: 300000,
    retry: 1,
  });
}
