import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            {/* <img src="src/assets/logo.png" /> */}
            <h2 className="text-xl font-bold text-blue-400">EthioWorks</h2>
            <p className="text-sm text-gray-300 mt-3">
              Connecting clients with skilled workers across Ethiopia. Build,
              hire, and grow with ease.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link className="hover:text-white" to="/jobs">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/hire">
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/how-it-works">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* WORKERS */}
          <div>
            <h3 className="font-semibold mb-3">For Workers</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link className="hover:text-white" to="/jobs/available">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/register/worker">
                  Become a Worker
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/verification">
                  Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h3 className="font-semibold mb-3">For Clients</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link className="hover:text-white" to="/jobs/post">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/register/client">
                  Become a Client
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/payments/client">
                  Payments
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EthioWorks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
