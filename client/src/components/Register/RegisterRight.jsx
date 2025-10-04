import React from "react";

const RegisterRight = () => {
  return (
    <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 outfit">
        Join SheetSense Today
      </h2>
      <p className="text-blue-800 mb-6">
        Sign up and begin transforming your Excel data into actionable insights
        through interactive charts and AI-powered summaries.
      </p>
      <img
        src="./loginregister.png"
        alt="Excel Analysis Preview"
        className="rounded-xl shadow-md"
      />
    </div>
  );
};

export default RegisterRight;
