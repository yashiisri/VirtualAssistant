

import React, { useRef, useState, useEffect, useContext } from 'react';
import { userDataContext } from '../context/UserContext';
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
