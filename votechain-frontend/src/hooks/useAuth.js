import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginApi,
  logout,
  signUpApi,
} from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate, isLoading };
}

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUpMutate, isLoading } = useMutation({
    mutationFn: ({
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      CNP,
    }) =>
      signUpApi({ email, password, passwordConfirm, firstName, lastName, CNP }),
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
      navigate("/login", { replace: true });
    },
  });

  return { signUpMutate, isLoading };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log("Logout succesfull: ", data);
      localStorage.removeItem("token");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutate, isLoading };
}

export function useCheckLogin() {
  const { isLoading, data: isAuthenticated } = useQuery({
    queryKey: ["userAuth"],
    queryFn: getCurrentUser,
  });
  console.log(isAuthenticated);
  return { isLoading, isAuthenticated };
}
