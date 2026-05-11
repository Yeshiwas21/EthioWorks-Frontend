import React from "react";
import { Routes, Route } from "react-router-dom";

import Messages from "../pages/common/Messages";
import NotFound from "../pages/common/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* MAIN APP */}
      <Route path="messages" element={<Messages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
