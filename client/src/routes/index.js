import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import PublicLayout from "./layouts/PublicLayout";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout/>} >
        <Route exact path="/auth" element={<AuthPage/>} />
        <Route exact path="/profile" element={<PrivateRoute>
          <ProfilePage/>
        </PrivateRoute>} />
        <Route  exact path="/" element={<HomePage/>} />
      </Route>
    </Routes>
  );
};
export default AllRoutes;
