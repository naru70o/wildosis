import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load Authenticated User
  const { isLoading, isAuthenticated } = useUser();

  // 2) no Authenticated, redirect to the login /login

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3) while Loading

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
