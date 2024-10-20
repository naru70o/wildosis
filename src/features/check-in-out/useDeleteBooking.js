import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      //   naviagte(-1);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.err(err.message),
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
