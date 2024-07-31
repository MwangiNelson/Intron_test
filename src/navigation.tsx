import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./modules/protectedRoute";

const LazyLoginPage = React.lazy(() => import("./pages/login"));
const LazyRegisterPage = React.lazy(() => import("./pages/register"));
const LazyUserHomePage = React.lazy(() => import("./pages/user"));

export function Navigation() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-pink-50 justify-center items-center">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<LazyUserHomePage />} />} />
        <Route path="/login" element={<LazyLoginPage />} />
        <Route path="/register" element={<LazyRegisterPage />} />
        <Route path="/user" element={<ProtectedRoute element={<LazyUserHomePage />} />} />
      </Routes>
    </Suspense>
  );
}
