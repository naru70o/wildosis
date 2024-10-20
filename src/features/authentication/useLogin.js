import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Provided Email or Password isn't correct");
      console.log("ERROR", error);
    },
  });

  return { login, isLoading };
}
