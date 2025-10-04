import React from "react";

const LoginRight = () => {
  return (
    <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 outfit">
        Access Your Smart Excel Analysis Dashboard
      </h2>
      <p className="text-blue-800 mb-6">
        Log in to SheetSense and explore AI-powered insights, interactive
        charts, and report downloads — all from your spreadsheets.
      </p>
      <img
        src="./loginregister.png"
        alt="Excel Analysis Preview"
        className="rounded-xl shadow-md"
      />
    </div>
  );
};

export default LoginRight;
