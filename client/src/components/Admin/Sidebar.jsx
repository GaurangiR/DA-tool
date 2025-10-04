import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCog,
  FaDatabase,
  FaThLarge,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 outfit
      ${
        active
          ? "bg-white text-[#2E3C43] font-semibold"
          : "text-white hover:bg-gradient-to-r hover:from-white hover:to-[#E0F7FA] hover:text-[#2E3C43]"
      }`}
  >
    <div className="text-lg">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: <FaThLarge />, label: "Admin Dashboard", path: "/admin" },
    { icon: <FaUserCog />, label: "Manage Users", path: "/admin/users" },
    { icon: <FaDatabase />, label: "Manage Files", path: "/admin/files" },
    { icon: <FaCog />, label: "Settings", path: "/admin/settings" },
  ];

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-[#00ACC1] text-2xl m-4 fixed top-4 left-4 z-50"
      >
        <FaBars />
      </button>

      {/* Mobile overlay and sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-[60px] z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#00ACC1] text-white p-6 flex flex-col gap-6 shadow-lg rounded-tr-3xl rounded-br-3xl md:hidden"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-8"
              >
                <img
                  src="./logo.png"
                  alt="SheetSense Logo"
                  className="w-10 h-10"
                />
                <h2 className="text-2xl font-bold outfit tracking-wide text-white">
                  Admin Panel
                </h2>
              </motion.div>

              {items.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.path}
                    onClick={() => handleNavigate(item.path)}
                  />
                </motion.div>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex w-64 bg-[#00ACC1] text-white p-6 flex-col gap-6 shadow-lg rounded-tr-3xl rounded-br-3xl"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <Logo />
          <h2 className="text-2xl font-bold outfit tracking-wide text-white">
            Admin Panel
          </h2>
        </motion.div>

        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SidebarItem
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            />
          </motion.div>
        ))}
      </motion.aside>
    </>
  );
}

export default Sidebar;
