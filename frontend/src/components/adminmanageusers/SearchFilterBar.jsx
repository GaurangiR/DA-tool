import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

export default function SearchFilterBar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  resetFilters,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <motion.input
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <motion.select
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </motion.select>
      <motion.button
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={resetFilters}
        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full sm:w-auto"
      >
        Clear Filters
      </motion.button>
    </div>
  );
}
