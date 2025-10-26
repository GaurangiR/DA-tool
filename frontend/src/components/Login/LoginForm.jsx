import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { setCredentials } from "../../redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
  
    try {
      // Optional: simulate delay before request
      await new Promise((res) => setTimeout(res, 2000));
  
      const data = await loginUser(formData);
      dispatch(setCredentials(data));
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
  
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/");
      alert(error.response?.data?.message || "Login failed");
      setIsLoading(false); // Stop loading in case of error
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-sm outfit"
    >
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">
        Login
      </h2>
      <p className="text-blue-800 text-center text-sm mb-6">
        Sign in to explore powerful Excel insights.
      </p>

      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/70 text-blue-900 placeholder-blue-400"
          onChange={handleChange}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/70 text-blue-900 placeholder-blue-400"
            onChange={handleChange}
            required
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on click
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}{" "}
            {/* Conditional rendering of icons */}
          </span>
        </div>
      </div>

      <div className="text-right mt-2 mb-6">
        <Link to="/register" className="text-sm text-blue-700 hover:underline">
          New User? Register
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
