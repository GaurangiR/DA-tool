import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ChartRenderer from "../useranalyze/ChartRenderer";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function DashboardHome() {
  const { user, token } = useSelector((state) => state.auth);
  const [pinnedCharts, setPinnedCharts] = useState([]);
  const { t, i18n } = useTranslation();

  const handleUnpin = async (chartId) => {
    try {
      await axios.delete(`${BASE_URL}/api/pinned-charts/${chartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPinnedCharts((prev) => prev.filter((chart) => chart._id !== chartId));
    } catch (error) {
      console.error("Failed to unpin chart:", error);
    }
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASE_URL}/api/pinned-charts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPinnedCharts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch pinned charts:", err);
      });
  }, [token]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i18n.language} // triggers re-animation when language changes
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeUp}
        className="p-4 sm:p-6 md:p-8 bg-white/80 rounded-2xl shadow-md w-full"
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2E3C43] mb-4 outfit"
          variants={fadeUp}
          custom={1}
        >
          {t("welcome", { name: user?.name })}
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-[#546E7A] mb-6"
          variants={fadeUp}
          custom={2}
        >
          {t("dashboard.welcomeMessage")}
        </motion.p>

        {pinnedCharts.length > 0 && (
          <motion.div variants={fadeUp} custom={3} className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              📌 {t("dashboard.pinnedCharts")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pinnedCharts.map((chart) => (
                <div
                  key={chart._id}
                  className="p-4 bg-white shadow rounded border border-gray-100 relative"
                >
                  <h3 className="font-semibold text-indigo-600 mb-1">
                    {chart.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-1">
                    📂 {t("fileName")}: {chart.fileName || "Unnamed File"}
                  </p>

                  <p className="text-sm text-gray-500 mb-1">
                    {t("dashboard.type")}: {chart.type}
                  </p>

                  <p className="text-sm text-gray-500 mb-2">
                    {t("dashboard.axis", {
                      x: chart.config?.xAxis,
                      y: chart.config?.yAxis,
                    })}
                  </p>

                  <div className="bg-white mt-2">
                    <ChartRenderer
                      fileData={chart.data}
                      xAxis={chart.config?.xAxis}
                      yAxis={chart.config?.yAxis}
                      chartType={chart.type}
                      isSmall
                    />
                  </div>

                  <button
                    onClick={() => handleUnpin(chart._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                    title={t("dashboard.unpin")}
                  >
                    ✖ {t("dashboard.unpin")}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardHome;
