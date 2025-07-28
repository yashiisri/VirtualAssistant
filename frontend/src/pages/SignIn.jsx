
import React, { useContext, useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl ,setUserdata} = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading,setloading]=useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
const handleSignIn = async (e) => {
  e.preventDefault();

  setError("");
  setPasswordError("");
  setloading(true);

  if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters.");
    setloading(false);

    return;
  }

  console.log("Form submitted ✅");
  console.log("Form data:", { email, password });

  try {
    const response = await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );

  setUserdata(response.data)
    alert("Login successful!");
    setloading(false);

    // Optionally redirect to home page or dashboard after login
    navigate("/"); // Replace with your route

  } catch (error) {
    console.log("❌ Login error:", error);
    setUserdata(null)
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
    setloading(false);
  }
};

  // const handleSignIn = async (e) => {
  //   e.preventDefault();

  //   setError("");
  //   setPasswordError("");
  //   setloading(true)

  //   if (password.length < 6) {
  //     setPasswordError("Password must be at least 6 characters.");
  //     return;
  //   }

  //   console.log("Form submitted ✅");
  //   console.log("Form data:", { email, password });

  //   try {
  //     const response = await axios.post(
  //       `${serverUrl}/api/auth/login`,
  //       { email, password },
  //       { withCredentials: true }
  //     );

  //     console.log("Server response:", response.data);
  //     setloading(false)
  //     // ✅ Redirect after successful login
  //     // Change "/home" to your desired route
  //   } catch (error) {
  //     console.log("Login error:", error);
  //     if (error.response?.data?.message) {
  //       setError(error.response.data.message);
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //       setloading(false)
  //     }
  //   }
  // };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
      }}
    >
      <form
        className='w-[90%] h-[720px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[16px] px-[20px] py-[30px] rounded-2xl'
        onSubmit={handleSignIn}
      >
        <h1 className='text-white text-[28px] font-semibold mb-[10px] text-center'>
          Login to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type='email'
          placeholder='Email'
          autoComplete="email"
          className='w-full h-[55px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px]'
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='relative w-full h-[55px]'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            autoComplete="current-password"
            className='w-full h-full outline-none border border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px]'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <IoEyeOff
              className='absolute top-[15px] right-[20px] text-white w-[22px] h-[22px] cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className='absolute top-[15px] right-[20px] text-white w-[22px] h-[22px] cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {passwordError && (
          <p className="text-red-400 text-[17px] w-full text-center px-[5px] -mt-[10px]">
            {passwordError}
          </p>
        )}

        <button className='mt-[20px] min-w-[150px] h-[55px] bg-white hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px]' disabled={loading}>{loading?"Loading...":"Login"}
         
        </button>

        {error && (
          <p className='text-red-400 text-[14px] text-center mt-[10px] px-[5px]'>
            {error}
          </p>
        )}

        <p className='text-white text-[16px] mt-[10px]'>
          Want to create a new Account?{' '}
          <span
            className='text-blue-400 hover:underline cursor-pointer'
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
