// import React, { useRef, useState } from 'react'
// import { useContext } from 'react'
// import { userDataContext } from '../context/userContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'

// function Home() {
//   const {userdata,serverUrl,setUserdata,getGeminiResp}=useContext(userDataContext)
//   const navigate=useNavigate()
//   const [setListening]=useState(false)
//   const isSpeakingRef=useRef(false)
//   const recognitionRef=useRef()
//   const sync=window.speechSynthesis
//   const handlelogout=async()=>{
//     try {
//        const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
//        navigate("/signup")
//        setUserdata(null)
//        return result.data

//     } catch (error) {
//       console.log(error)
//     }
//   }
// // const speak=(text)=>{
// //     const utterence=new SpeechSynthesisUtterance(text)
// //     window.speechSynthesis.speak(utterence)

// // }
// const speak = (text) => {
//   if (!sync) {
//     console.error("Speech Synthesis not supported in this browser.");
//     return;
//   }

//   const utterance = new SpeechSynthesisUtterance(text);
//   isSpeakingRef.current=true
//   utterance.onend=()=>{
//     isSpeakingRef.current=false;
//     recognitionRef.current?.start()
//   }
//   utterance.lang = 'en-US'; // Ensure it's in English
//   utterance.pitch = 1;
//   utterance.rate = 1;
//   utterance.volume = 1;

//   // Optionally select a voice
//   const voices = sync.getVoices();
//   if (voices.length > 0) {
//     utterance.voice = voices.find(v => v.lang === 'en-US') || voices[0];
//   }

//   // Wait for voices to be loaded (especially in Chrome)
//   if (speechSynthesis.getVoices().length === 0) {
//     speechSynthesis.onvoiceschanged = () => {
//       const voices = speechSynthesis.getVoices();
//       utterance.voice = voices.find(v => v.lang === 'en-US') || voices[0];
//       speechSynthesis.speak(utterance);
//     };
//   } else {
//     speechSynthesis.speak(utterance);
//   }
// };


// const handleCommand=(data)=>{
//   const {type,userInput,response}=data
//   speak(response)
//   if(type==='Google Search'){
//     const query=encodeURIComponent(userInput)
//     window.open(`https://www.google.com/search?q=${query}`,'_blank')
//   }
//   if (type === 'facebook_open') {
//   window.open(`https://www.facebook.com`, '_blank');
// }
// if (type === 'instagram_open') {
//   window.open(`https://www.instagram.com`, '_blank');
// }
// if (type === 'youtube_play') {
//   const query = encodeURIComponent(userInput);
//   window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
// }
// if (type === 'Youtube') {
//   const query = encodeURIComponent(userInput);
//   window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
// }

// if (type === 'calculator_open') {
//   window.open(`https://www.google.com/search?q=calculator`,'_blank');
// }
// if (type === 'weather-show') {

//   window.open(`https://www.google.com/search?q=weather`, '_blank');
// }
// }

// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     console.error("Speech recognition not supported in this browser.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = 'en-US';

//   recognitionRef.current=recognition
//   const isRecognizingRef={current:false}
//   const safeRecognition=()=>{
//      if(!isSpeakingRef.current && !isRecognizingRef.current){
//     try {
//        recognition.start()
//        console.log("Recognition requested to start");
//     } catch (error) {
//       if(error.name!=="InvalidStateError"){
//         console.error("Start error:",error)
//       }
      
//     }
//      }
//   }

//   recognition.onStart=()=>{
//     console.log("recognition started")
//     isRecognizingRef.current=true
//     setListening(true)
//   }
//    recognition.onend=()=>{
//     console.log("recognition ended")
//     isRecognizingRef.current=false
//     setListening(false)
//   }

//   if(!isSpeakingRef.current){
//     setTimeout(()=>{
//       safeRecognition()
//     },10000)
//   }

//   recognition.onError=(event)=>{
// console.warn("Recognition error:",event.error);
// isRecognizingRef.current=false;
// setListening(false)
// if(event.error!=="aborted" && !isSpeakingRef.current){
//   setTimeout(()=>{
//     safeRecognition()
//   },1000)
// }
//   }

//   recognition.onresult = async (e) => {
//     const transcript = e.results[e.results.length - 1][0].transcript;
//     console.log("🎙️ You said:", transcript);

//     if (!userdata?.assistantName) return;

//     if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
//       recognition.stop()
//       isRecognizingRef.current=false
//       setListening(false)
//       const data = await getGeminiResp(transcript);
//       if (!data) {
//         console.warn("❌ No response from Gemini or failed to parse response.");
//         return;
//       }
//       console.log("✅ Gemini Response:", data);
//       speak(data.response)
//       handleCommand(data)
//     }
//   };

//   recognition.start();
//   const fallback=setInterval(()=>{
//     if(!isSpeakingRef.current && !isRecognizingRef.current){
//       safeRecognition()
//     }
//   },10000)

// safeRecognition()

//   // Cleanup on unmount
//   return () => {
//     recognition.stop();
//     setListening(false)
//     isRecognizingRef.current=false;
//     clearInterval(false)
//   }
// }, [userdata, getGeminiResp]);






//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571]  flex justify-center items-center flex-col gap-[15px] '>
//        <button className='mt-[20px] min-w-[150px] h-[55px] cursor-pointer bg-white absolute top-[20px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px]' onClick={handlelogout} >
//        Logout
//         </button>
//  <button className='mt-[20px] min-w-[250px] h-[55px] cursor-pointer bg-white absolute top-[100px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px] px-[20px] py-[10px]' onClick={()=>navigate("/customize")} >
//      Customize Your Assistant
//         </button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
// <img src={userdata?.assistantImage}alt='' className='h-full object-cover shadow-lg'/>

//       </div>
//       <h1 className='text-white text-[18px]  font-semibold'>I'm {userdata.assistantName}</h1>
//     </div>
//   )
// }

// export default Home

// import React, { useRef, useState, useEffect, useContext } from 'react';
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//   const { userdata, serverUrl, setUserdata, getGeminiResp } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const isRecognizingRef = useRef(false);
//   const intervalRef = useRef(null);

//   const synth = window.speechSynthesis;

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserdata(null);
//       navigate("/signup");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const speakAndAct = (text, type, userInput) => {
//     if (!synth) {
//       console.error("Speech Synthesis not supported.");
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     isSpeakingRef.current = true;

//     utterance.onend = () => {
//       isSpeakingRef.current = false;

//       // Perform action after speaking
//       const query = encodeURIComponent(userInput);

//       switch (type) {
//         case 'Google Search':
//           window.open(`https://www.google.com/search?q=${query}`, '_blank');
//           break;
//         case 'facebook_open':
//           window.open(`https://www.facebook.com`, '_blank');
//           break;
//         case 'instagram_open':
//           window.open(`https://www.instagram.com`, '_blank');
//           break;
//         case 'youtube_play':
//         case 'Youtube':
//           window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//           break;
//         case 'calculator_open':
//           window.open(`https://www.google.com/search?q=calculator`, '_blank');
//           break;
//         case 'weather-show':
//           window.open(`https://www.google.com/search?q=weather`, '_blank');
//           break;
//         default:
//           break;
//       }

//       restartRecognition();
//     };

//     const voices = synth.getVoices();
//     if (voices.length > 0) {
//       utterance.voice = voices.find(v => v.lang === 'en-US') || voices[0];
//     }

//     utterance.lang = 'en-US';
//     utterance.pitch = 1;
//     utterance.rate = 1;
//     utterance.volume = 1;

//     // Fallback for Chrome lazy voice loading
//     if (synth.getVoices().length === 0) {
//       synth.onvoiceschanged = () => {
//         const updatedVoices = synth.getVoices();
//         utterance.voice = updatedVoices.find(v => v.lang === 'en-US') || updatedVoices[0];
//         synth.speak(utterance);
//       };
//     } else {
//       synth.speak(utterance);
//     }
//   };

//   const restartRecognition = () => {
//     if (!isRecognizingRef.current && !isSpeakingRef.current && recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//         isRecognizingRef.current = true;
//         setListening(true);
//         console.log("🎧 Recognition restarted");
//       } catch (error) {
//         if (error.name !== 'InvalidStateError') {
//           console.error("Restart error:", error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition not supported.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       console.log("🎤 Recognition started");
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       console.log("🛑 Recognition ended");
//       isRecognizingRef.current = false;
//       setListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       if (!isSpeakingRef.current) {
//         setTimeout(restartRecognition, 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       console.log("🎙️ You said:", transcript);

//       if (!userdata?.assistantName) return;

//       if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);

//         const data = await getGeminiResp(transcript);
//         if (!data) {
//           console.warn("❌ No response from Gemini.");
//           restartRecognition();
//           return;
//         }

//         console.log("✅ Gemini Response:", data);
//         speakAndAct(data.response, data.type, data.userInput);
//       }
//     };

//     recognition.start();

//     // Fallback interval to recheck
//     intervalRef.current = setInterval(() => {
//       if (!isRecognizingRef.current && !isSpeakingRef.current) {
//         restartRecognition();
//       }
//     }, 10000);

//     return () => {
//       recognition.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//       clearInterval(intervalRef.current);
//     };
//   }, [userdata, getGeminiResp]);

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col gap-[15px]'>
//       <button
//         className='mt-[20px] min-w-[150px] h-[55px] cursor-pointer bg-white absolute top-[20px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px]'
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//       <button
//         className='mt-[20px] min-w-[250px] h-[55px] cursor-pointer bg-white absolute top-[100px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px] px-[20px] py-[10px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
//         <img src={userdata?.assistantImage} alt='' className='h-full object-cover shadow-lg' />
//       </div>

//       <h1 className='text-white text-[18px] font-semibold'>I'm {userdata.assistantName}</h1>
//     </div>
//   );
// }

// export default Home;

// import React, { useRef, useState, useEffect, useContext } from 'react';
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Home() {
//   const { userdata, serverUrl, setUserdata, getGeminiResp } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const isRecognizingRef = useRef(false);
//   const intervalRef = useRef(null);

//   const synth = window.speechSynthesis;

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserdata(null);
//       navigate("/signup");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const speakAndAct = async (text, type, userInput) => {
//     const waitForVoices = () =>
//       new Promise((resolve) => {
//         let voices = synth.getVoices();
//         if (voices.length) return resolve(voices);
//         synth.onvoiceschanged = () => resolve(synth.getVoices());
//       });

//     const voices = await waitForVoices();
//     const voice = voices.find(v => v.lang === 'en-US') || voices[0];

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = voice;
//     utterance.lang = 'en-US';
//     utterance.pitch = 1;
//     utterance.rate = 1;
//     utterance.volume = 1;

//     isSpeakingRef.current = true;

//     utterance.onend = () => {
//       isSpeakingRef.current = false;

//       const query = encodeURIComponent(userInput);

//       switch (type) {
//         case 'Google Search':
//           window.open(`https://www.google.com/search?q=${query}`, '_blank');
//           break;
//         case 'facebook_open':
//           window.open(`https://www.facebook.com`, '_blank');
//           break;
//         case 'instagram_open':
//           window.open(`https://www.instagram.com`, '_blank');
//           break;
//         case 'youtube_play':
//         case 'Youtube':
//           window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//           break;
//         case 'calculator_open':
//           window.open(`https://www.google.com/search?q=calculator`, '_blank');
//           break;
//         case 'weather-show':
//           window.open(`https://www.google.com/search?q=weather`, '_blank');
//           break;
//         default:
//           break;
//       }

//       restartRecognition();
//     };

//     synth.speak(utterance);
//   };

//   const restartRecognition = () => {
//     if (!isRecognizingRef.current && !isSpeakingRef.current && recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//         isRecognizingRef.current = true;
//         setListening(true);
//         console.log("🎧 Recognition restarted");
//       } catch (error) {
//         if (error.name !== 'InvalidStateError') {
//           console.error("Restart error:", error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition not supported.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognitionRef.current = recognition;

//     const safeStart = () => {
//       if (!isRecognizingRef.current && !isSpeakingRef.current) {
//         try {
//           recognition.start();
//           console.log("🎧 Recognition (re)started");
//           isRecognizingRef.current = true;
//           setListening(true);
//         } catch (e) {
//           if (e.name !== 'InvalidStateError') console.error("Start error:", e);
//         }
//       }
//     };

//     recognition.onstart = () => {
//       console.log("🎤 Recognition started");
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       console.log("🛑 Recognition ended");
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (!isSpeakingRef.current) {
//         setTimeout(() => safeStart(), 1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.warn("⚠️ Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       if (!isSpeakingRef.current) {
//         setTimeout(() => safeStart(), 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       console.log("🎙️ You said:", transcript);

//       if (!userdata?.assistantName) return;

//       if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);

//         const data = await getGeminiResp(transcript);
//         if (!data) {
//           console.warn("❌ No response from Gemini");
//           safeStart(); // resume listening anyway
//           return;
//         }

//         console.log("✅ Gemini Response:", data);
//         await speakAndAct(data.response, data.type, data.userInput);
//       }
//     };

//     safeStart();

//     intervalRef.current = setInterval(() => {
//       if (!isRecognizingRef.current && !isSpeakingRef.current) {
//         safeStart();
//       }
//     }, 8000);

//     return () => {
//       recognition.stop();
//       clearInterval(intervalRef.current);
//       setListening(false);
//       isRecognizingRef.current = false;
//     };
//   }, [userdata, getGeminiResp]);

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col gap-[15px]'>
//       <button
//         className='mt-[20px] min-w-[150px] h-[55px] cursor-pointer bg-white absolute top-[20px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px]'
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//       <button
//         className='mt-[20px] min-w-[250px] h-[55px] cursor-pointer bg-white absolute top-[100px] right-[20px] hover:bg-blue-400 transition-all duration-200 rounded-full text-black font-semibold text-[16px] px-[20px] py-[10px]'
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
//         <img src={userdata?.assistantImage} alt='' className='h-full object-cover shadow-lg' />
//       </div>

//       <h1 className='text-white text-[18px] font-semibold'>I'm {userdata.assistantName}</h1>
//       <h2 className='text-white text-[14px]'>{listening ? '🎙️ Listening...' : '🛑 Not Listening'}</h2>
//     </div>
//   );
// }

// export default Home;

// import React, { useRef, useState, useEffect, useContext } from 'react';
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu } from 'lucide-react'; // hamburger icon (lucide-react is installed in shadcn apps)
// import  aiImg from "../assets/ai.gif"
// import userImg from "../assets/user.gif"

// function Home() {
//   const { userdata, serverUrl, setUserdata, getGeminiResp } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const isRecognizingRef = useRef(false);
//   const intervalRef = useRef(null);
//   const [userText,setUserText]=useState("")
//   const[aiText,setaiText]=useState("")
//   const synth = window.speechSynthesis;

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserdata(null);
//       navigate("/signup");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const waitForVoices = () =>
//     new Promise((resolve) => {
//       let voices = synth.getVoices();
//       if (voices.length) return resolve(voices);
//       synth.onvoiceschanged = () => resolve(synth.getVoices());
//     });

//  const speakAndAct = async (text, type, userInput) => {
//   if (!synth) {
//     console.error("Speech Synthesis not supported.");
//     return;
//   }

//   const voices = await waitForVoices();

//   // Language detection (simple check for Hindi characters)
//   const isHindi = /[\u0900-\u097F]/.test(userInput);

//   let selectedVoice;

//   if (isHindi) {
//     selectedVoice =
//       voices.find(v => v.lang.includes("hi") && v.name.toLowerCase().includes("female")) ||
//       voices.find(v => v.lang.includes("hi")) || voices[0];
//   } else {
//     selectedVoice =
//       voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("male")) ||
//       voices.find(v => v.lang === "en-US") || voices[0];
//   }

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.voice = selectedVoice;
//   utterance.lang = selectedVoice.lang;
//   utterance.pitch = 1;
//   utterance.rate = 1;
//   utterance.volume = 1;

//   isSpeakingRef.current = true;

//   utterance.onend = () => {
//     setaiText("")
//     isSpeakingRef.current = false;

//     const query = encodeURIComponent(userInput);
//     switch (type) {
//       case 'Google Search':
//         window.open(`https://www.google.com/search?q=${query}`, '_blank');
//         break;
//       case 'facebook_open':
//         window.open(`https://www.facebook.com`, '_blank');
//         break;
//       case 'instagram_open':
//         window.open(`https://www.instagram.com`, '_blank');
//         break;
//       case 'youtube_play':
//       case 'Youtube':
//         window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//         break;
//       case 'calculator_open':
//         window.open(`https://www.google.com/search?q=calculator`, '_blank');
//         break;
//       case 'weather-show':
//         window.open(`https://www.google.com/search?q=weather`, '_blank');
//         break;
//       default:
//         break;
//     }

//     restartRecognition();
//   };

//   synth.cancel(); // Cancel any previous utterance
//   synth.speak(utterance);
// };


//   const restartRecognition = () => {
//     if (!isRecognizingRef.current && !isSpeakingRef.current && recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//         isRecognizingRef.current = true;
//       } catch (error) {
//         if (error.name !== 'InvalidStateError') {
//           console.error("Restart error:", error);
//         }
//       }
//     }
//   };

// //   useEffect(() => {
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       console.error("Speech Recognition not supported.");
// //       return;
// //     }

// //     const recognition = new SpeechRecognition();
// //     recognition.continuous = true;
// //     recognition.lang = 'en-US';
// //     recognition.interimResults = false;
// //     recognitionRef.current = recognition;

// //     const safeStart = () => {
// //       if (!isRecognizingRef.current && !isSpeakingRef.current) {
// //         try {
// //           recognition.start();
// //           isRecognizingRef.current = true;
// //         } catch (e) {
// //           if (e.name !== 'InvalidStateError') console.error("Start error:", e);
// //         }
// //       }
// //     };

// //     recognition.onstart = () => {
// //       isRecognizingRef.current = true;
// //     };

// //     recognition.onend = () => {
// //       isRecognizingRef.current = false;
// //       if (!isSpeakingRef.current) {
// //         setTimeout(() => safeStart(), 1000);
// //       }
// //     };

// //     recognition.onerror = (event) => {
// //       console.warn("⚠️ Recognition error:", event.error);
// //       isRecognizingRef.current = false;
// //       if (!isSpeakingRef.current) {
// //         setTimeout(() => safeStart(), 1000);
// //       }
// //     };

// //     recognition.onresult = async (e) => {
// //       const transcript = e.results[e.results.length - 1][0].transcript.trim();
// //       console.log("🎙️ You said:", transcript);

// //       if (!userdata?.assistantName) return;

// //       if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
// //         setaiText("")
// //         setUserText(transcript)
// //         recognition.stop();
// //         isRecognizingRef.current = false;

// //         const data = await getGeminiResp(transcript);
// //      if (!data) {
// //   console.warn("❌ No response from Gemini");
// //   setUserText("");
// //   setaiText("Sorry, I couldn't understand that.");
// //   safeStart();
// //   return;
// // }

// // console.log("✅ Gemini Response:", data);

// // // 🔄 Set AI text immediately to trigger AI GIF
// // setaiText(data.response);
// // setUserText("");

// // await speakAndAct(data.response, data.type, data.userInput);

// //       }
// //     };

// //     safeStart();

// //     intervalRef.current = setInterval(() => {
// //       if (!isRecognizingRef.current && !isSpeakingRef.current) {
// //         safeStart();
// //       }
// //     }, 8000);

// //     return () => {
// //       recognition.stop();
// //       clearInterval(intervalRef.current);
// //       isRecognizingRef.current = false;
// //     };
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [userdata, getGeminiResp]);

// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   if (!SpeechRecognition) {
//     console.error("Speech Recognition not supported.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = 'en-US';
//   recognition.interimResults = false;
//   recognitionRef.current = recognition;

//   let isComponentMounted = true;

//   const safeStart = () => {
//     if (!isComponentMounted || isRecognizingRef.current || isSpeakingRef.current) return;
//     try {
//       recognition.start();
//       isRecognizingRef.current = true;
//       console.log("🎧 SafeStart - recognition started");
//     } catch (e) {
//       if (e.name !== 'InvalidStateError') console.error("Start error:", e);
//     }
//   };

//   recognition.onstart = () => {
//     isRecognizingRef.current = true;
//     console.log("🎤 Recognition started");
//   };

//   recognition.onend = () => {
//     isRecognizingRef.current = false;
//     console.log("🛑 Recognition ended");
//     if (isComponentMounted && !isSpeakingRef.current) {
//       setTimeout(() => safeStart(), 1000);
//     }
//   };

//   recognition.onerror = (event) => {
//     if (event.error === "aborted") {
//       console.warn("⚠️ Recognition aborted – likely due to route change");
//       return;
//     }
//     console.warn("⚠️ Recognition error:", event.error);
//     isRecognizingRef.current = false;
//     if (isComponentMounted && !isSpeakingRef.current) {
//       setTimeout(() => safeStart(), 1000);
//     }
//   };

//   recognition.onresult = async (e) => {
//     const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     console.log("🎙️ You said:", transcript);

//     if (!userdata?.assistantName) return;

//     if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
//       setaiText("");
//       setUserText(transcript);
//       recognition.stop();
//       isRecognizingRef.current = false;

//       const data = await getGeminiResp(transcript);
//       if (!data) {
//         console.warn("❌ No response from Gemini");
//         setUserText("");
//         setaiText("Sorry, I couldn't understand that.");
//         safeStart();
//         return;
//       }

//       console.log("✅ Gemini Response:", data);
//       setaiText(data.response);
//       setUserText("");

//       await speakAndAct(data.response, data.type, data.userInput);
//     }
//   };

//   // ✅ Delay safeStart on navigation to allow previous page cleanup
//   setTimeout(() => {
//     if (isComponentMounted) safeStart();
//   }, 1000); // 1s delay after mounting

//   intervalRef.current = setInterval(() => {
//     if (isComponentMounted && !isRecognizingRef.current && !isSpeakingRef.current) {
//       safeStart();
//     }
//   }, 8000);

//   return () => {
//     isComponentMounted = false;
//     try {
//       recognition.stop();
//     // eslint-disable-next-line no-unused-vars
//     } catch (_) { /* empty */ }
//     clearInterval(intervalRef.current);
//     isRecognizingRef.current = false;
//     console.log("🔁 Cleanup complete");
//   };
// }, [userdata, getGeminiResp]);

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col gap-4 relative'>
//       {/* Hamburger Menu */}
//       <div className='absolute top-4 right-4 z-50'>
//         <button
//           className='text-white focus:outline-none'
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <Menu size={32} />
//         </button>
//         {menuOpen && (
//           <div className='mt-2 bg-white text-black rounded shadow-lg flex flex-col w-[200px] absolute right-0'>
//             <button
//               onClick={handleLogout}
//               className='px-4 py-3 text-left hover:bg-blue-100 border-b'
//             >
//               Logout
//             </button>
//             <button
//               onClick={() => navigate("/customize")}
//               className='px-4 py-3 text-left hover:bg-blue-100'
//             >
//               Customize Assistant
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Assistant Image */}
//       <div className='w-[280px] h-[380px] sm:w-[300px] sm:h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-xl'>
//         <img
//           src={userdata?.assistantImage}
//           alt='Assistant'
//           className='h-full w-full object-cover'
//         />
//       </div>

//       {/* Assistant Name */}
//       <h1 className='text-white text-[18px] font-semibold text-center'>
//         I'm {userdata.assistantName}, How can I help You?
//       </h1>
//       {!aiText && <img src={userImg} alt='' className='w-[200px]'/> }
//         {aiText && <img src={aiImg} alt='' className='w-[200px]'/> }
//         <h1 className='text-white text-[18px] font-bold text-wrap '>{userText?userText:aiText?aiText:null}</h1>
//     </div>
//   );
// }

// export default Home;

import React, { useRef, useState, useEffect, useContext } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu } from 'lucide-react';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

function Home() {
  const { userdata, serverUrl, setUserdata, getGeminiResp } = useContext(userDataContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const intervalRef = useRef(null);
  const greetedRef = useRef(false); // ensures greeting runs only once

  const synth = window.speechSynthesis;

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserdata(null);
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  const waitForVoices = () =>
    new Promise((resolve) => {
      let voices = synth.getVoices();
      if (voices.length) return resolve(voices);
      synth.onvoiceschanged = () => resolve(synth.getVoices());
    });

  const speakAndAct = async (text, type, userInput) => {
    if (!synth) return;

    const voices = await waitForVoices();
    const isHindi = /[\u0900-\u097F]/.test(userInput);

    const selectedVoice = isHindi
      ? voices.find(v => v.lang.includes("hi") && v.name.toLowerCase().includes("female")) ||
        voices.find(v => v.lang.includes("hi")) || voices[0]
      : voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("male")) ||
        voices.find(v => v.lang === "en-US") || voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    isSpeakingRef.current = true;
    setAiText(text); // show AI gif and response

    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;

      const query = encodeURIComponent(userInput);
      switch (type) {
        case 'Google Search':
          window.open(`https://www.google.com/search?q=${query}`, '_blank');
          break;
        case 'facebook_open':
          window.open(`https://www.facebook.com`, '_blank');
          break;
        case 'instagram_open':
          window.open(`https://www.instagram.com`, '_blank');
          break;
        case 'youtube_play':
        case 'Youtube':
          window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
          break;
        case 'calculator_open':
          window.open(`https://www.google.com/search?q=calculator`, '_blank');
          break;
        case 'weather-show':
          window.open(`https://www.google.com/search?q=weather`, '_blank');
          break;
        default:
          break;
      }

      restartRecognition();
    };

    synth.cancel();
    synth.speak(utterance);
  };

  const restartRecognition = () => {
    if (!isRecognizingRef.current && !isSpeakingRef.current && recognitionRef.current) {
      try {
        recognitionRef.current.start();
        isRecognizingRef.current = true;
      } catch (error) {
        if (error.name !== 'InvalidStateError') {
          console.error("Restart error:", error);
        }
      }
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    const safeStart = () => {
      if (!isRecognizingRef.current && !isSpeakingRef.current) {
        try {
          recognition.start();
          isRecognizingRef.current = true;
        } catch (e) {
          if (e.name !== 'InvalidStateError') console.error("Start error:", e);
        }
      }
    };

    recognition.onstart = () => {
      isRecognizingRef.current = true;
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      if (!isSpeakingRef.current) {
        setTimeout(() => safeStart(), 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("⚠️ Recognition error:", event.error);
      isRecognizingRef.current = false;
      if (!isSpeakingRef.current) {
        setTimeout(() => safeStart(), 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("🎙️ You said:", transcript);

      if (!userdata?.assistantName) return;

      if (transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())) {
        setUserText(transcript);
        setAiText("");
        recognition.stop();
        isRecognizingRef.current = false;

        const data = await getGeminiResp(transcript);
        if (!data) {
          setAiText("Sorry, I couldn't understand that.");
          setUserText("");
          safeStart();
          return;
        }

        console.log("✅ Gemini Response:", data);
        await speakAndAct(data.response, data.type, data.userInput);
        setUserText("");
      }
    };

    safeStart();

    intervalRef.current = setInterval(() => {
      if (!isRecognizingRef.current && !isSpeakingRef.current) {
        safeStart();
      }
    }, 8000);

    return () => {
      recognition.stop();
      clearInterval(intervalRef.current);
      isRecognizingRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userdata, getGeminiResp]);

  // 🔊 Greet user once when Home mounts
  useEffect(() => {
    const greetUser = async () => {
      if (!userdata || greetedRef.current) return;
      greetedRef.current = true;

      const voices = await waitForVoices();
      const isHindi = /[\u0900-\u097F]/.test(userdata.assistantName || "");

      const selectedVoice = isHindi
        ? voices.find(v => v.lang.includes("hi") && v.name.toLowerCase().includes("female")) ||
          voices.find(v => v.lang.includes("hi")) || voices[0]
        : voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("male")) ||
          voices.find(v => v.lang === "en-US") || voices[0];

      const greetingText = isHindi
        ? `नमस्ते! मैं आपकी सहायक ${userdata.assistantName} हूं। क्या मैं आपकी मदद कर सकती हूं?`
        : `Hello! I'm your assistant ${userdata.assistantName}. How can I help you today?`;

      const utterance = new SpeechSynthesisUtterance(greetingText);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      isSpeakingRef.current = true;
      setAiText(greetingText);

      utterance.onend = () => {
        setAiText("");
        isSpeakingRef.current = false;
        restartRecognition();
      };

      synth.cancel();
      synth.speak(utterance);
    };

    greetUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userdata]);

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#050571] flex justify-center items-center flex-col gap-4 relative'>
      {/* Hamburger Menu */}
      <div className='absolute top-4 right-4 z-50'>
        <button
          className='text-white focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={32} />
        </button>
        {menuOpen && (
          <div className='mt-2 bg-white text-black rounded shadow-lg flex flex-col w-[200px] absolute right-0'>
            <button
              onClick={handleLogout}
              className='px-4 py-3 text-left hover:bg-blue-100 border-b'
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/customize")}
              className='px-4 py-3 text-left hover:bg-blue-100'
            >
              Customize Assistant
            </button>
          </div>
        )}
      </div>

      {/* Assistant Image */}
      <div className='w-[280px] h-[380px] sm:w-[300px] sm:h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-xl'>
        <img
          src={userdata?.assistantImage}
          alt='Assistant'
          className='h-full w-full object-cover'
        />
      </div>

      {/* Assistant Name */}
      <h1 className='text-white text-[18px] font-semibold text-center'>
        I'm {userdata.assistantName}, How can I help you?
      </h1>

      {/* Speaking/User GIF */}
      <img
        src={aiText ? aiImg : userImg}
        alt='Voice indicator'
        className='w-[200px] transition-all duration-300'
      />

      {/* Spoken Text Display */}
      <h1 className='text-white text-[18px] font-bold text-wrap text-center max-w-[90%]'>
        {userText || aiText}
      </h1>
    </div>
  );
}

export default Home;
