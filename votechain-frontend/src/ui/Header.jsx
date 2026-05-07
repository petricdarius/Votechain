import { useLogout } from "../hooks/useAuth";

function Header() {
  const { logoutMutate, isLoading } = useLogout();

  return (
    <div>
      <button onClick={() => logoutMutate()} disabled={isLoading}>
        Logout
      </button>
    </div>
  );
}

export default Header;
