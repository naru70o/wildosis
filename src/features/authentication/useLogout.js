import toast from "react-hot-toast";
import { Logout as logoutApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const querClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logoutApi({ email, password }),
    onSuccess: (user) => {
      querClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error("Provided Email or Password isn't correct");
      console.log("ERROR", error);
    },
  });

  return { logout, isLoading };
}
