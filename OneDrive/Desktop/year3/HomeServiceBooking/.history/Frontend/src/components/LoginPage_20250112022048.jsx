import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleLogin = (response) => {
    console.log("Google login response:", response);
    // Handle Google login response, and navigate to the dashboard or homepage
    navigate("/dashboard");  // Redirect to the service provider/user dashboard
  };

  const handleRoleChange = (e) => {
    if (e.target.value === "serviceProvider") {
      setIsServiceProvider(true);
    } else {
      setIsServiceProvider(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.log("Login Failed")}
          useOneTap
        />

        {/* Manual Login Form (if not using Google Login) */}
        <div className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {/* Role selection */}
          <select
            onChange={handleRoleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="serviceProvider">Service Provider</option>
          </select>

          {isServiceProvider && (
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleLocationChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
          )}

          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
