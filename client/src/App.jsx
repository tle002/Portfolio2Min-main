import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import useAuthStore from "./Zustand/Auth Store/useAuthStore";

// Lazy-loaded route components
const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const HowItWorks = lazy(() => import("./pages/How it works/HowItWorks"));
const Features = lazy(() => import("./pages/Features/Features"));
const ErrorPage = lazy(() => import("./pages/Error Page/ErrorPage"));
const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
const Userdashboard = lazy(() => import("./pages/UserDashbaord/Userdashboard"));
const Introduction = lazy(() => import("./pages/Introduction/Introduction"));

function App() {
  const { isAuthenticated } = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading Landing Page...</div>}>
              <LandingPage />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<div>Loading Register...</div>}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "/howitworks",
          element: (
            <Suspense fallback={<div>Loading How It Works...</div>}>
              <HowItWorks />
            </Suspense>
          ),
        },
        {
          path: "/features",
          element: (
            <Suspense fallback={<div>Loading Features...</div>}>
              <Features />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<div>Loading Error Page...</div>}>
              <ErrorPage />
            </Suspense>
          ),
        },
        {
          path: "/personal-portfolio/:username",
          element: (
            <Suspense fallback={<div>Loading Portfolio...</div>}>
              <Portfolio />
            </Suspense>
          ),
        },
        {
          path: "/preview-portfolio",
          element: isAuthenticated ? (
            <Suspense fallback={<div>Loading Portfolio...</div>}>
              <Portfolio />
            </Suspense>
          ) : (
            <Login />
          ),
        },
        {
          path: "/user-dashboard/*",
          element: isAuthenticated ? (
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <Userdashboard />
            </Suspense>
          ) : (
            <Login />
          ),
        },
        {
          path: "/introduction/:introId",
          element: isAuthenticated ? (
            <Suspense fallback={<div>Loading Introduction...</div>}>
              <Introduction />
            </Suspense>
          ) : (
            <Login />
          ),
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
