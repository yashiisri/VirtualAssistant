// import React, { useContext, useState } from 'react';
// import { userDataContext } from '../context/userContext';
// import axios from 'axios';
// import { MdArrowBack } from 'react-icons/md'; // ✅ correct import
// import { useNavigate } from 'react-router-dom';
// // ✅ MISSING IMPORT FIXED

// function Customize2() {
//   const { userdata, backendImg, selectedimg, serverUrl, setUserdata } = useContext(userDataContext);
//   const [assname, setassname] = useState(userdata?.assname || "");
//   const [loading, setLoading] = useState(false);
//   const navigate=useNavigate()

//   const handleupdateass = async () => {
//     try {
//       setLoading(true);
//       let formdata = new FormData();
//       formdata.append("assistantName", assname); // ✅ MATCH BACKEND


//       if (backendImg) {
//         formdata.append("assistantimage", backendImg); // ✅ correct image field name
//       } else {
//         formdata.append("imageUrl", selectedimg);
//       }

//       const result = await axios.post(`${serverUrl}/api/user/update`, formdata, { withCredentials: true });

//       console.log(result.data);
//       setUserdata(result.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col p-[20px]'>
//       <MdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
//       onClick={()=>navigate("/customize")} />
//       <h1 className='text-white text-[30px] text-center mb-[40px]'>
//         Enter your <span className='text-blue-900'>Assistant Name</span>
//       </h1>

//       <input
//         type='text'
//         placeholder='eg.-Joey'
//         className='w-full max-w-[600px] h-[55px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px]'
//         required
//         onChange={(e) => setassname(e.target.value)}
//         value={assname}
//       />

// {assname && (
//   <button
//     className='mt-[20px] min-w-[200px] h-[60px] bg-white hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold cursor-pointer text-[16px]'
//     disabled={loading}
//   onClick={async () => {
//   await handleupdateass();
//   // Now read updated data from API or local result
//   const updatedData = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
//   if (updatedData?.data?.assistantImage && updatedData?.data?.assistantName) {
//     setUserdata(updatedData.data);
//     navigate("/");
//   } else {
//     alert("Update failed or incomplete. Try again.");
//   }
// }}

//   >
//     {!loading ? "Create Your Assistant!" : "Loading..."}
//   </button>
// )}

//     </div>
//   );
// }

// export default Customize2;
import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/userContext';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Customize2() {
  const {
    userdata,
    backendImg,
    selectedimg,
    serverUrl,
    setUserdata
  } = useContext(userDataContext);

  const [assname, setAssname] = useState(userdata?.assistantName || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleupdateass = async () => {
    try {
      setLoading(true);
      let formdata = new FormData();
      formdata.append("assistantName", assname); // ✅ match backend

      if (backendImg) {
        formdata.append("assistantimage", backendImg);
      } else {
        formdata.append("imageUrl", selectedimg);
      }

      await axios.post(`${serverUrl}/api/user/update`, formdata, {
        withCredentials: true,
      });

      // ✅ Fetch updated user
      const updatedData = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      if (updatedData?.data?.assistantImage && updatedData?.data?.assistantName) {
        setUserdata(updatedData.data);
        navigate("/");
      } else {
        alert("Update failed or incomplete. Try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col p-[20px]'>
      <MdArrowBack
        className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
        onClick={() => navigate("/customize")}
      />
      <h1 className='text-white text-[30px] text-center mb-[40px]'>
        Enter your <span className='text-blue-900'>Assistant Name</span>
      </h1>

      <input
        type='text'
        placeholder='eg.-Joey'
        className='w-full max-w-[600px] h-[55px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[16px]'
        required
        onChange={(e) => setAssname(e.target.value)}
        value={assname}
      />

      {assname && (
        <button
          className='mt-[20px] min-w-[200px] h-[60px] bg-white hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold cursor-pointer text-[16px]'
          disabled={loading}
          onClick={handleupdateass}
        >
          {!loading ? "Create Your Assistant!" : "Loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
