import UserRow from "./UserRow";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

export default function UsersTable({ users, ...props }) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <motion.table
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full bg-white"
      >
        <thead className="bg-gradient-to-r from-cyan-100 to-blue-100 text-gray-700 font-semibold">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u) => <UserRow key={u._id} u={u} {...props} />)
          )}
        </tbody>
      </motion.table>
    </div>
  );
}
