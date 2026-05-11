import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Sparkles,
  BookOpen,
  Hammer,
  Paintbrush,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getHomeRoute } from "../../utils/getHomeRoute";

function HomePage() {
  const { user, loading } = useAuth();

  const services = [
    { name: "Plumbing", icon: Wrench, color: "text-blue-600 bg-blue-100" },
    { name: "Electrical", icon: Zap, color: "text-yellow-600 bg-yellow-100" },
    { name: "Cleaning", icon: Sparkles, color: "text-green-600 bg-green-100" },
    {
      name: "Tutoring",
      icon: BookOpen,
      color: "text-purple-600 bg-purple-100",
    },
    {
      name: "Appliance Repair",
      icon: Wrench,
      color: "text-orange-600 bg-orange-100",
    },
    { name: "Painting", icon: Paintbrush, color: "text-pink-600 bg-pink-100" },
    { name: "Carpentry", icon: Hammer, color: "text-amber-700 bg-amber-100" },
  ];

  //  wait auth check
  if (loading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  // if logged in → redirect to dashboard
  if (user?.isAuthenticated) {
    return <Navigate to={getHomeRoute(user)} replace />;
  }

  // 🔥 NOT LOGGED IN → show landing page
  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find Skilled Workers or Get Hired Fast in Ethiopia
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              EthioWorks connects clients and skilled workers for jobs like
              plumbing, electrical work, cleaning, tutoring and more.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/jobs/available"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Find Work
              </Link>

              <Link
                to="/hire"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
              >
                Hire Talent
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="src/assets/workers.png"
              alt="workers"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 overflow-hidden bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Popular Services
          </h2>

          <div className="relative overflow-hidden">
            <Motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              {[...services, ...services].map((service, index) => {
                const Icon = service.icon;

                return (
                  <div
                    key={index}
                    className="min-w-62.5 bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${service.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      {service.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Find verified {service.name.toLowerCase()} professionals
                    </p>
                  </div>
                );
              })}
            </Motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">How EthioWorks Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-blue-600 text-4xl font-bold">1</div>
              <h3 className="font-semibold mt-3">Post a Job</h3>
              <p className="text-gray-500 mt-2">
                Clients post jobs with budget and details
              </p>
            </div>

            <div>
              <div className="text-blue-600 text-4xl font-bold">2</div>
              <h3 className="font-semibold mt-3">Get Applications</h3>
              <p className="text-gray-500 mt-2">Workers apply with proposals</p>
            </div>

            <div>
              <div className="text-blue-600 text-4xl font-bold">3</div>
              <h3 className="font-semibold mt-3">Hire & Pay</h3>
              <p className="text-gray-500 mt-2">
                Complete job and release payment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>

        <p className="mt-3 text-blue-100">
          Join EthioWorks and start hiring or working today
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Join Now
          </Link>

          <Link
            to="/jobs/available"
            className="border border-white px-6 py-3 rounded-lg"
          >
            Browse Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
