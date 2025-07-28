import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://virtualassistant-backend-cuvk.onrender.com";
  const [userdata, setUserdata] = useState(null);
    const [frontendImg,setFrontendImg]=useState(null);
      const[backendImg,setBackendImg]=useState(null);
      const [selectedimg,setSelectedImg]=useState(null)
const handleCurrentUser = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/current`, {
      withCredentials: true,
    });
    setUserdata(result.data);
    console.log("Current user:", result.data);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log("User not logged in (no token).");
    } else {
      console.error("Error checking user:", error.message);
    }
    setUserdata(null); // Clear user context if error
  }
};

const getGeminiResp=async(command)=>{
  try {
    const result=await axios.post(`${serverUrl}/api/user/ask`,{command},{withCredentials:true})
    return result.data
  } catch (error) {

    console.log(error)
    
  }

}


  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userdata,
    setUserdata,
    frontendImg,setFrontendImg,
    backendImg,setBackendImg,
    selectedimg,setSelectedImg,
    getGeminiResp
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
