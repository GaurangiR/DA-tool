import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

function Topbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <motion.div
      className="flex justify-end items-center gap-4 mb-6"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { when: "beforeChildren", staggerChildren: 0.2 },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <LanguageSwitcher />

      <motion.span
        variants={itemVariants}
        className="text-[#2E3C43] outfit font-semibold"
      >
        {user?.name}
      </motion.span>

      <motion.button
        variants={itemVariants}
        onClick={handleLogout}
        className="bg-white text-[#00ACC1] px-4 py-2 rounded shadow-sm hover:bg-[#4DD0E1] hover:text-white transition-all cursor-pointer outfit font-semibold"
      >
        {t("logout")}
      </motion.button>
    </motion.div>
  );
}

export default Topbar;
