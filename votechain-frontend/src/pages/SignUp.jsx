import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import isCorrectCNP from "../services/isCorrectCNP";
import { useSignUp } from "../hooks/useAuth";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signUpMutate, isLoading } = useSignUp();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);

    signUpMutate({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      firstName: data.firstName,
      lastName: data.lastName,
      CNP: data.CNP,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-600 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center w-full px-4"
      >
        {/* Title */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
          VoteChain
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}

            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm">{errors.firstName.message}</p>
            )}

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm">{errors.lastName.message}</p>
            )}

            {/* CNP */}
            <input
              type="text"
              placeholder="CNP"
              {...register("CNP", {
                required: "CNP is required",
                pattern: {
                  value: /^[0-9]{13}$/,
                  message: "CNP must be 13 digits",
                },
                validate: (value) => {
                  isCorrectCNP(value) || "Invalid CNP";
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.CNP && (
              <p className="text-red-400 text-sm">{errors.CNP.message}</p>
            )}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("passwordConfirm", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.passwordConfirm && (
              <p className="text-red-400 text-sm">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
          >
            Register
          </button>

          {/* Footer */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <NavLink className="text-purple-400 cursor-pointer" to="/login">
              Login
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
