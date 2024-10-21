import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUSer, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser, //can pass only one element
    onSuccess: ({ user }) => {
      toast.success("user account succesfully Updated");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error("could not be updated the user");
    },
  });

  return { updateUSer, isUpdating };
}
