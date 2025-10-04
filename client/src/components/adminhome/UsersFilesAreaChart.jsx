import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const UsersFilesAreaChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg font-semibold mb-4">Users & Files Overview</h3>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00bcd4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#00bcd4"
          fillOpacity={1}
          fill="url(#colorUsers)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

export default UsersFilesAreaChart;
