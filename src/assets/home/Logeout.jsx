import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // চাইলে এখানে localStorage.removeItem("user") করতে পারো
    navigate("/"); // logout শেষে হোমে নিয়ে যাবে
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-80 text-center">
        <i className="fas fa-sign-out-alt text-5xl mb-4 text-red-400" />
        <h2 className="text-2xl font-semibold mb-2">Are you sure?</h2>
        <p className="text-gray-300 mb-6">Do you really want to log out?</p>

        <div className="flex justify-around">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Yes, Logout
          </button>

          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Logout;


