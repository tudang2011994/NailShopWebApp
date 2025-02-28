"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../../store/slices/authSlice';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState(null);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('regular'); // 'regular', 'otp', 'google'

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegularLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData = { username, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // Include credentials (cookies)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      dispatch(login({ user: data.user, token: data.token }));
      router.push('/customer'); // Redirect to customer page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const otpData = { username, otp };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/otp-authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
        credentials: 'include', // Include credentials (cookies)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      dispatch(login({ user: data.user, token: data.token }));
      router.push('/customer'); // Redirect to customer page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/googleLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenID: credential }),
        credentials: 'include', // Include credentials (cookies)
      });
      const data = await res.json();
      console.log("Google login response data:", data); // Log the entire data object
      if (data.RequiresPhoneNumber) {
        // Show form to input phone number
        setShowPhoneNumberForm(true);
        setUserId(data.UserId);
        console.log("User ID set to:", data.UserId); // Log the userId
      } else {
        // Handle successful login
        dispatch(login({ user: data.user, token: data.token }));
        router.push('/customer'); // Redirect to customer page
      }
    } catch (error) {
      setError('Error during Google login');
    }
  };

  const handleGoogleLoginFailure = (response) => {
    setError('Google login failed');
  };

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting phone number with userId:", userId); // Log the userId before sending the request
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/updatePhoneNumber`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, userId }),
        credentials: 'include', // Include credentials (cookies)
      });
      const data = await res.json();
      // Handle successful phone number update
      dispatch(login({ user: data.user, token: data.token }));
      setShowPhoneNumberForm(false);
      router.push('/customer'); // Redirect to customer page
    } catch (error) {
      setError('Error updating phone number');
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Loading...</p>}
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 ${loginMethod === 'regular' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLoginMethod('regular')}
          >
            Regular Login
          </button>
          <button
            className={`px-4 py-2 mr-2 ${loginMethod === 'otp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLoginMethod('otp')}
          >
            OTP Login
          </button>
          <button
            className={`px-4 py-2 ${loginMethod === 'google' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLoginMethod('google')}
          >
            Google Login
          </button>
        </div>
        {loginMethod === 'regular' && (
          <form onSubmit={handleRegularLogin}>
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        )}
        {loginMethod === 'otp' && (
          <form onSubmit={handleOtpLogin}>
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        )}
        {loginMethod === 'google' && (
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
          />
        )}
        {showPhoneNumberForm && (
          <form onSubmit={handlePhoneNumberSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </form>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;