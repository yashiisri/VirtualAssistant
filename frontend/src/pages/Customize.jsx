import React, { useContext, useRef } from 'react';
import Card from '../components/Card.jsx';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri"; // ✅ Correct import
import { userDataContext } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; 

function Customize() {
    const navigate=useNavigate()
    const {  
 
    frontendImg,setFrontendImg,
   setBackendImg,
    selectedimg,setSelectedImg}=useContext(userDataContext);
  
    const inputImage=useRef()
    const handleImage=(e)=>{
        const file=e.target.files[0];
        setBackendImg(file)
        setFrontendImg(URL.createObjectURL(file))

        
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col p-[20px]'>
       <MdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
            onClick={()=>navigate("/")} />
        <h1 className='text-white text-[30px] text-center mb-[40px]'>Select your <span className='text-blue-900'> Assistant Image </span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Icon Card */}
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#030326] border-2 border-blue-500 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center
          ${selectedimg=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null}`}
        onClick={()=>{inputImage.current.click()
            setSelectedImg("input")
        }}>
            {!frontendImg && <RiImageAddLine className='text-white w-[30px] h-[30px]' />}
            {frontendImg && <img src={frontendImg} className='h-full object-cover'/>}
          
        </div>
        <input type='file' accept='image/*' ref={inputImage} hidden
        onChange={handleImage}/>

      </div>
      {selectedimg &&   <button className='mt-[20px] min-w-[150px] h-[55px] bg-white hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold cursor-pointer text-[16px]' onClick={()=>navigate("/customize2")}>Next</button> }
            
    </div>
  );
}

export default Customize;
