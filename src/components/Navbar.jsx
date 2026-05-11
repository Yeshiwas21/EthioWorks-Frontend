import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { user } = useAuth();
  const isAuth = user?.isAuthenticated;

  // Resolve name based on role
  const getDisplayName = () => {
    if (!user) return "";

    // ADMIN FIRST (highest priority)
    if (user.is_staff) {
      const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
      return name || "Admin";
    }

    // CLIENT
    if (user.user_type === "client") {
      return user.client?.company_name || "No Client";
    }

    // WORKER
    if (user.user_type === "worker") {
      const name =
        `${user.worker?.first_name || ""} ${user.worker?.last_name || ""}`.trim();
      return name || "Worker";
    }

    return "User";
  };

  const displayName = getDisplayName();
  const email = user?.email;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          EthioWorks
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {!isAuth && (
            <>
              <Link className="hover:text-blue-600" to="/jobs">
                Find Jobs
              </Link>

              <Link className="hover:text-blue-600" to="/hire">
                Hire Talent
              </Link>
            </>
          )}

          {isAuth && user.user_type === "worker" && (
            <Link className="hover:text-blue-600" to="/jobs">
              Find Jobs
            </Link>
          )}

          {isAuth && user.user_type === "client" && (
            <Link className="hover:text-blue-600" to="/hire">
              Hire Talent
            </Link>
          )}

          <Link className="hover:text-blue-600" to="/how-it-works">
            How it Works
          </Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!isAuth ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* USER BUTTON */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {displayName?.charAt(0)}
                </div>
                <span className="text-sm font-medium">{displayName}</span>
              </button>

              {/* DROPDOWN */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-sm">{displayName}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>

                  <div className="flex flex-col text-sm">
                    <Link
                      to="/account/profile"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/account/settings"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>

                    <Link
                      to="/account/change-password"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Change Password
                    </Link>

                    <Link
                      to="/logout"
                      className="px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3 text-sm">
          <Link to="/jobs" className="block">
            Find Jobs
          </Link>

          <Link to="/hire" className="block">
            Hire Talent
          </Link>

          <Link to="/how-it-works" className="block">
            How it Works
          </Link>

          {!isAuth ? (
            <>
              <Link to="/login" className="block">
                Login
              </Link>
              <Link to="/register" className="block">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="border-t pt-2">
                <p className="font-semibold">{displayName}</p>
                <p className="text-xs text-gray-500">{email}</p>
              </div>

              <Link to="/account/profile" className="block">
                Profile
              </Link>
              <Link to="/account/settings" className="block">
                Settings
              </Link>
              <Link to="/account/change-password" className="block">
                Change Password
              </Link>
              <Link to="/logout" className="block text-red-500">
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
