import { useMutation, useQueryClient } from "@tanstack/react-query";
import updatePassword from "../../service/settings/updatePassword";

export default function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      localStorage.setItem("user", data.idToken);
    },
  });
}
