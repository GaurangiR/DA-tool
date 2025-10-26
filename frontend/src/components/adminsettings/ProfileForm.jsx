import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

const ProfileForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <motion.form
      onSubmit={handleSubmit}
      custom={0.2}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="space-y-4"
    >
      <motion.input
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
        required
      />
      <motion.input
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        type="email"
        name="email"
        value={formData.email}
        readOnly
        placeholder="Email Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed shadow-sm"
      />
      <motion.input
        custom={0.5}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password (optional)"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
      />
      <motion.button
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        type="submit"
        className="w-full py-2 rounded-xl bg-[#007ea7] text-white font-semibold hover:bg-[#0097a7] shadow-md transition"
      >
        Update Profile
      </motion.button>
    </motion.form>
  );
};

export default ProfileForm;
