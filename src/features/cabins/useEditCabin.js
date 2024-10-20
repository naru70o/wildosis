import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), //can pass only one element
    onSuccess: () => {
      toast.success("New cabin successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    // onError: toast.error("could not be Created new Cabin"),
  });

  return { editCabin, isEditing };
}
