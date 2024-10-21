import { useLogout } from "../features/authentication/useLogout";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon>
      {!isLoading ? (
        <HiArrowRightOnRectangle disabled={isLoading} onClick={logout} />
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
