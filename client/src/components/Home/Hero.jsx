import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-6 lg:px-20 md:px-10">
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-[#2E3C43] outfit">Welcome to SheetSense</h2>
          <p className="text-[#546E7A] text-lg outfit">
            Upload Excel files, analyze your data with 2D/3D charts, gain insights and download reports — all in one smart platform.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-[#00ACC1] text-white px-6 py-2 rounded hover:bg-[#0097A7] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#2E3C43] px-6 py-2 rounded hover:bg-[#f0f4f8] transition"
            >
              Register
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/homeright.png"
            alt="SheetSense Dashboard Preview"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </main>
  )
}

export default Hero
