import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });
  const { mutate, isLoading } = useAuth();

  const [shake, setShake] = useState(false);

  function submit(data) {
    mutate(data);
  }

  const onError = () => {
    setShake(true);
    setTimeout(() => setShake(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit(submit, onError)}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-600 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-[50px] font-black tracking-tighter text-white">
            VOTE<span className="text-blue-500">CHAIN</span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          drag
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>

          {/* Inputs */}
          <div className="space-y-4">
            <motion.input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              {...register("email", { required: "Required field" })}
              animate={
                shake && errors.password ? { x: [0, -20, 10, -16, 6, 0] } : {}
              }
              transition={{ duration: 0.5 }}
            />

            <motion.input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Required field" })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              animate={
                shake && errors.password ? { x: [0, 20, -10, 16, -6, 0] } : {}
              }
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Button */}
          <motion.button
            animate={{
              scale: isValid ? 1.1 : 1,
              boxShadow: isValid
                ? "0px 0px 20px rgba(168,85,247,0.7)"
                : "0px 0px 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
          >
            Login
          </motion.button>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Footer */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Don’t have an account?{" "}
            <NavLink className="text-purple-400 cursor-pointer" to="/signup">
              Sign up
            </NavLink>
          </p>
        </motion.div>
      </div>
    </form>
  );
}
