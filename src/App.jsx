import React, {lazy, Suspense} from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "../components/Error";
import { Products } from "../components/Products";
import "./index.css";
import { Toaster,toast } from "react-hot-toast";
import LoginForm from "../components/auth/LoginForm";
import Header from "../components/Header";

const AppLayout = () => {
    useEffect(() => {
      toast("⚠️ We are using a free Render API. Initial load may take up to 50 seconds. Please be patient.", {
        icon: "⏳",
        duration: Infinity,
        position: "top-left",
        
      });
  }, []);
    return (
    <div className="app">
        <Toaster position="top-right" reverseOrder={false} />
        <Header/>
        <h1 className="text-2xl font-bold text-center mt-4">Welcome to Product Reviews</h1>
        {/* Renders matched child route component */}
        <Outlet />
    </div>
    )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // ⬅️ renders when path is exactly "/"
        element: <Products />,
      },
      {
        path: "Reviews",
        element: <Products />,
      },
      {
        path: "login",
        element: <LoginForm/>
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router = {appRouter} />);
