import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSingup() {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Acount successfully created!, please verify the new account from the users eamail address"
      );
    },
  });

  return { singup, isLoading };
}
