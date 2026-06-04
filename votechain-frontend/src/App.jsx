import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./pages/SignUp";
import Election from "./pages/Election";
import { Toaster } from "react-hot-toast";
import MyVotes from "./pages/MyVotes";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminDashboard from "./pages/AdminDashboard";
import AdminElections from "./pages/AdminElections";
import ElectionResults from "./ui/ElectionResults";
import AdminUsers from "./pages/AdminUsers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/elections" element={<AdminElections />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route
                path="elections/:id/results"
                element={<ElectionResults />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="elections/:id" element={<Election />} />
              <Route path="MyVotes" element={<MyVotes />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            style: {
              fontSize: "15px",
              maxWidth: "500px",
              padding: "14px 20px",
              backgroundColor: "#121620",
              color: "#f3f4f6",
              borderRadius: "12px",
            },

            success: {
              duration: 3000,
              style: {
                border: "1px solid rgba(34, 197, 94, 0.4)",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.15)",
              },
            },

            error: {
              duration: 5000,
              style: {
                border: "1px solid rgba(239, 68, 68, 0.4)",
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.15)",
              },
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
