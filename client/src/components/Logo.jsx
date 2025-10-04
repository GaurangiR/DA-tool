import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.header
        className="px-2 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/"><img src="./logo.png" alt="SheetSense Logo" className="w-12 h-12" /></Link>
      </motion.header>
  )
}

export default Logo
