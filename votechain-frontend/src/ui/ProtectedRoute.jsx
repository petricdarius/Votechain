import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useCheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
