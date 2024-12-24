import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import MyTemplates from "./pages/MyTemplates";
import CreateTemplate from "./pages/CreateTemplate";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/authStore";
import Loading from "./components/loading/Loading";
import Template from "./pages/Template";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route element={ isAuthenticated ? <Layout /> :  < Navigate to="/login" />}>
        <Route path="/my-templates" element={<MyTemplates />} />
        <Route path="/template/create" element={<CreateTemplate />} />
        <Route path="/templates/:templateId" element={<Template />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
