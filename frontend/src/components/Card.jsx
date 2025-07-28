import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Card({image}) {
      const{serverUrl,
    userdata,
    setUserdata,
    frontendImg,setFrontendImg,
    backendImg,setBackendImg,
    selectedimg,setSelectedImg}=useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] 
        rounded-2xl overflow-hidden hover:shadow-2xl
         hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white  
         ${selectedimg==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`}
    onClick={()=>{setSelectedImg(image)
        setBackendImg(null)
        setFrontendImg(null)
    }}>
        <img src={image} className='h-full  object-cover' />
    </div>
  )
}

export default Card
