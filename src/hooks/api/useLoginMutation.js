import { useMutation } from "@tanstack/react-query";
import login from "../../service/login/login";

export default function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  });
}
