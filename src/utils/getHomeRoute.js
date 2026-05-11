/**
 * Returns the correct home/dashboard route based on user role.
 * This keeps routing logic centralized and reusable across the app.
 *
 * @param {Object} user - authenticated user object
 * @returns {string} route path
 */

export const getHomeRoute = (user) => {
  if (!user?.isAuthenticated) return "/";

  switch (user?.user_type) {
    case "admin":
      return "/admin/dashboard";

    case "client":
      return "/client/dashboard";

    case "worker":
      return "/worker/dashboard";

    default:
      return "/";
  }
};