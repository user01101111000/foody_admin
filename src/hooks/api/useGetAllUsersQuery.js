import { useQuery } from "@tanstack/react-query";
import getUsers from "../../service/users/getUsers";

export default function useGetAllUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 300000,
    retry: 1,
  });
}
