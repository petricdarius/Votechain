import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useCheckLogin();
  const { user, isLoading: isUserLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || isUserLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated || user) return children;
}

export default ProtectedRoute;
