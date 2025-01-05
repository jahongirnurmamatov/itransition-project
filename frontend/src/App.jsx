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
import Profile from "./pages/Profile";
import UserTemplates from "./pages/UserTemplates";
import EditTemplate from "./pages/EditTemplate";
import AllTemplates from "./pages/AllTemplates";
import { useLanguageStore } from "./store/languageStore";

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, authUser } = useAuthStore();
  
  const initializeLanguage = useLanguageStore((state) => state.initializeLanguage);

  useEffect(() => {
    initializeLanguage(); 
  }, [initializeLanguage]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route element={  <Layout /> }>
        <Route path="/my-templates" element={isAuthenticated ? <MyTemplates /> : <Navigate to="/login" />} />
        <Route path="/all-templates" element={<AllTemplates />} />
        <Route path="/template/create"  element={isAuthenticated ? <CreateTemplate />: <Navigate to="/login" />} />
        <Route path="/template/edit/:templateId" element={isAuthenticated ? <EditTemplate/> : <Navigate to="/login" />} />
        <Route path="/templates/:templateId" element={<Template />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/:id/user-templates" element={<UserTemplates />} />
        <Route path="/my-profile" element={isAuthenticated ? <Profile userId={authUser?.id} /> : <Navigate to="/login" />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
