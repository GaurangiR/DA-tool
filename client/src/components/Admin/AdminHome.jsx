import { useSelector } from "react-redux";
import StatCard from "../adminhome/StatCard";
import UsersFilesAreaChart from "../adminhome/UsersFilesAreaChart";
import DistributionPieChart from "../adminhome/DistributionPieChart";
import { FaUser, FaFileAlt } from "react-icons/fa";
import useFetchCounts from "../adminhome/useFetchCounts";

const AdminHome = () => {
  const { token } = useSelector((state) => state.auth);
  const { counts, loading, error } = useFetchCounts(token);

  const chartData = [
    { name: "Users", value: counts.users },
    { name: "Files", value: counts.files },
  ];

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#007ea7] to-[#00c2cb]">
        Welcome, Admin!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard icon={FaUser} label="Total Users" value={counts.users} color="text-sky-500" />
        <StatCard icon={FaFileAlt} label="Total Files" value={counts.files} color="text-emerald-500" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsersFilesAreaChart data={chartData} />
        <DistributionPieChart data={chartData} />
      </div>
    </div>
  );
};

export default AdminHome;
