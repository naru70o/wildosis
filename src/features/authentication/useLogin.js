import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

export function useLogin() {
  const navigate = useNavigate();
  const querClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      querClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Provided Email or Password isn't correct");
    },
  });

  return { login, isLoading };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}
