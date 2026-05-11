import React from "react";
import { Routes, Route } from "react-router-dom";

/* Client Pages */
import Dashboard from "../pages/dashboard/Dashboard";
import MyJobs from "../pages/jobs/MyJobs";
import PostJob from "../pages/jobs/PostJob";
import ClientPayments from "../pages/payments/ClientPayments";
import ClientReviews from "../pages/reviews/ClientReviews";
import ClientVerification from "../pages/verification/ClientVerification";
import NotFound from "../pages/common/NotFound";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="jobs/my" element={<MyJobs />} />
      <Route path="jobs/post" element={<PostJob />} />
      <Route path="payments" element={<ClientPayments />} />
      <Route path="reviews" element={<ClientReviews />} />
      <Route path="verification" element={<ClientVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ClientRoutes;
