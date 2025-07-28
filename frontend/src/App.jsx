// import React, { useContext } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import Customize from './pages/Customize'
// import { userDataContext } from './context/userContext'
// import Home from './pages/Home'
// import Customize2 from './pages/Customize2.jsx'

// function App() {
//   const {userdata}=useContext(userDataContext)
//   return (
//   <Routes>
    
//       <Route path="/" element={(userdata?.assistantImage && userdata?.assistantName)?<Home/>:<Navigate to={"/customize"}/>}/>
      
//     <Route path='/signup' element={!userdata?<SignUp/>:<Navigate to={"/customize"}/>}/>
//     <Route path='/login' element={!userdata?<SignIn/>:<Navigate to={"/"}/>}/>
//      <Route path='/customize' element={userdata?<Customize/>:<Navigate to={"/signup"}/>}/>
//           <Route path='/customize2' element={userdata?<Customize2/>:<Navigate to={"/signup"}/>}/>
//   </Routes>
//   )
// }

// export default App




import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2';
import Home from './pages/Home';
import { userDataContext } from './context/userContext';

function App() {
  const { userdata } = useContext(userDataContext);

  const isAuthenticated = !!userdata;
  const hasAssistant = userdata?.assistantImage && userdata?.assistantName;

  return (
    <Routes>
      <Route path="/" element={hasAssistant ? <Home /> : <Navigate to="/customize" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/login" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/customize" element={isAuthenticated ? <Customize /> : <Navigate to="/signup" />} />
      <Route path="/customize2" element={isAuthenticated ? <Customize2 /> : <Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
