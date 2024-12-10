import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MyTemplates from "./pages/MyTemplates";
import CreateTemplate from "./pages/CreateTemplate";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/my-templates" element={<MyTemplates />} />
        <Route path="/create/:templateId" element={<CreateTemplate />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
