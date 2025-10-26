import { motion } from "framer-motion";
import LoginForm from "../components/Login/LoginForm";
import Logo from "../components/Logo";
import LoginRight from "../components/Login/LoginRight";

function Login() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#dff1fd] to-[#b3dcf3] px-4">
      {/* Logo at Top Left */}
        <Logo />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen lg:mt-[-100px]">
        {/* Left: Login Form */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full md:w-1/2 flex items-center justify-center p-6"
        >
          <LoginForm />
        </motion.div>

        {/* Right: Description and Image Card */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 flex items-center justify-center p-6"
        >
         <LoginRight /> 
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
