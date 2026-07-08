import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import LiveSite from "./pages/LiveSite";
export const serverUrl = `${import.meta.env.VITE_SERVER_URL}/api`;
const App = () => {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/site/:id" element={<LiveSite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
