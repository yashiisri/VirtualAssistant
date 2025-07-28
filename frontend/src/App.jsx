


import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2';
import Home from './pages/Home';
import { userDataContext } from './context/UserContext';

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
