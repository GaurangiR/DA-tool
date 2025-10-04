import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

export default function FileTable({
  files,
  viewFile,
  downloadFile,
  deleteFile,
}) {
  return (
    <motion.table
      custom={0}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full bg-white"
    >
      <motion.thead
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-cyan-100 to-blue-100 text-gray-700 font-semibold"
      >
        <tr>
          <th className="p-3 text-left">Filename</th>
          <th className="p-3 text-left">Uploaded By</th>
          <th className="p-3 text-left">Uploaded At</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </motion.thead>
      <motion.tbody
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {files.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center p-4 text-gray-500">
              No files found.
            </td>
          </tr>
        ) : (
          files.map((f) => (
            <tr key={f._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{f.fileName}</td>
              <td className="p-3">{f.user?.name || "—"}</td>
              <td className="p-3">{new Date(f.createdAt).toLocaleString()}</td>
              <td className="p-3 flex justify-center gap-4 text-lg">
                {/* <button onClick={() => viewFile(f._id)} className="text-blue-600 hover:text-blue-800" title="View">
                  <FiEye />
                </button>
                <button onClick={() => downloadFile(f._id, f.fileName)} className="text-green-600 hover:text-green-800" title="Download">
                  <FiDownload />
                </button> */}
                <button
                  onClick={() => deleteFile(f._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))
        )}
      </motion.tbody>
    </motion.table>
  );
}
