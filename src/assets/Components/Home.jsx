import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { User, Users, Eye } from "lucide-react";
import Footer from "./Footer";

const HomePage = () => {
  const [isWelcomeShown, setIsWelcomeShown] = useState(false);
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Boost Your Social Media Presence with TrendySpark
          </h1>
          <p className="text-xl mb-6">
            Get real followers and views for TikTok, YouTube, and more with smooth, guaranteed results.
          </p>
          <Link to="/YouTubeDashboard">
            <motion.button
              className="bg-indigo-800 hover:bg-indigo-700 text-white py-3 px-8 rounded-xl text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800 text-center">
        <motion.h2
          className="text-4xl font-semibold mb-10 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Features You Will Love
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 sm:px-10">
          <motion.div
            className="bg-gray-700 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform transform duration-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Eye size={32} />
            <h3 className="text-xl mt-4">Real Results</h3>
            <p className="mt-2">Genuine followers and views delivered at lightning speed.</p>
          </motion.div>

          <motion.div
            className="bg-gray-700 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform transform duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <User size={32} />
            <h3 className="text-xl mt-4">User-Friendly</h3>
            <p className="mt-2">Easy-to-use interface with smooth, intuitive navigation.</p>
          </motion.div>

          <motion.div
            className="bg-gray-700 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform transform duration-300"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Users size={32} />
            <h3 className="text-xl mt-4">Community Support</h3>
            <p className="mt-2">Get the help you need from a growing, vibrant community.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
      
    </div>
  );
};

export default HomePage;
