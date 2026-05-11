import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../pages/account/Profile";
import Settings from "../pages/account/Settings";
import ChangePassword from "../pages/account/ChangePassword";
import NotFound from "../pages/common/NotFound";

function UserRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default UserRoutes;
