import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function UserRow({ u, editingId, formState, handleChange, startEdit, cancelEdit, saveEdit, deleteUser }) {
  const isEditing = editingId === u._id;

  return (
    <tr className="border-t transition hover:bg-gray-50">
      <td className="p-3">
        <input
          name="name"
          value={isEditing ? formState.name : u.name}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full px-2 py-1 rounded-md ${isEditing ? "border border-gray-300 bg-white" : "border-none bg-transparent"}`}
        />
      </td>
      <td className="p-3">
        <input
          name="email"
          value={isEditing ? formState.email : u.email}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full px-2 py-1 rounded-md ${isEditing ? "border border-gray-300 bg-white" : "border-none bg-transparent"}`}
        />
      </td>
      <td className="p-3">
        <select
          name="role"
          value={isEditing ? formState.role : u.role}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full px-2 py-1 rounded-md ${isEditing ? "border border-gray-300 bg-white cursor-pointer" : "border-none bg-transparent"}`}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="p-3 flex justify-center gap-3 text-lg">
        {isEditing ? (
          <>
            <button onClick={() => saveEdit(u._id)} className="text-green-600 hover:text-green-800">💾</button>
            <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-800">✖️</button>
          </>
        ) : (
          <>
            <button onClick={() => startEdit(u)} className="text-blue-600 hover:text-blue-800"><FaRegEdit size={18} /></button>
            <button onClick={() => deleteUser(u._id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
          </>
        )}
      </td>
    </tr>
  );
}
