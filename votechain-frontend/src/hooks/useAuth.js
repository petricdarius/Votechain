import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, signUpApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const queyClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queyClient.setQueryData(["user"], data.user);
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
