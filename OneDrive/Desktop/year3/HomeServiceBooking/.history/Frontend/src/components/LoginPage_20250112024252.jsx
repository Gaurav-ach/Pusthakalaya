import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // Handle Google login success
  const handleGoogleLogin = (response) => {
    console.log(response);
    // You can send this response to your backend for authentication
    // Or use a service like Firebase to authenticate with Google
    // After successful login, you can navigate to the dashboard or another page
    navigate("/dashboard");
  };

  // Handle Google login error
  const handleGoogleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form className="max-w-md mx-auto">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded"
          />

          {/* Login button */}
          <button className="w-full p-3 bg-blue-500 text-white rounded">
            Login
          </button>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500"
              >
                Register
              </button>
            </p>

            {/* Google Signup button */}
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginFailure}
              useOneTap
              shape="rectangular"
              theme="filled_blue"
            />
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
