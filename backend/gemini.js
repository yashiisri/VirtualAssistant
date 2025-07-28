
// import axios from "axios"
// const geminiResp=async(prompt)=>{
//     try {
//         const ApiUrl=process.env.GEMINI_API_URL
//         const result=await axios.post(ApiUrl,{
//           "contents": [
//       {
//         "parts": [
//           {
//             "text": prompt
//           }
//         ]
//       }]
//     })
//      return result.data
      
    
//     } catch (error) {
//         console.log(error)
//     }
// }
// export default geminiResp


// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const geminiResp = async (prompt) => {
//   try {
//     const ApiUrl = process.env.GEMINI_API_URL;
//     const ApiKey = process.env.GEMINI_API_KEY;

//     const result = await axios.post(
//       ApiUrl,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt
//               }
//             ]
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${ApiKey}`
//         }
//       }
//     );

//     return result.data;

//   } catch (error) {
//     console.log(error);
//   }
// };

// export default geminiResp;
// import axios from "axios";

// const geminiResp = async (command,assistantName,userName) => {
//   try {
//     const ApiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;
//    const prompt=`You are a virtual assistant named ${assistantName} created by ${userName}.
// You are not Google. You will now behave like a voice-enabled assistant.
// Your task is to understand the user's natural language input and respond with a JSON object like this:

// {
//   "type": "general" | "Google Search" | "Youtube" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",
//   "userInput": "<original user inputs>" (only remove your name from userInput if exists) and if somebody has asked to search on youtube or google then userInput should have only that particular text only,
//   "response": "<a short spoken response to read out loud to the user>"
// }
  
// instructions:
//     - "type": determine the intent of the user.
//     - "userInput": original sentence the user spoke.
//     - "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's
//      what I found", "Today is Tuesday", etc.
     
     
//      Type meanings:
//   - "general": if it's a factual or informational question.
//   - "Google Search": if user wants to search something on Google.
//   - "Youtube": if user wants to search something on YouTube.
//   - "youtube_play": if user wants to directly play a video or song.
//   - "calculator_open": if user wants to open a calculator.
//   - "instagram_open": if user wants to open instagram.
//   - "facebook_open": if user wants to open facebook.
//   - "weather-show": if user wants to know weather
//   - "get_time": if user asks for current time.
//   - "get_date": if user asks for today's date.
//   - "get_month":if user asks for the current month
  
//   Important:
//   -Use ${userName} is somebody asks who made you
//   -Only respond with the JSON object, Nothing else
    
    
//     now your userInput-${command}`

  
//     const result = await axios.post(
//       ApiUrl,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Gemini returns response here
//     const text = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     return text ? { response: text } : null;

//   } catch (error) {
//     console.error("Gemini error:", error.response?.data || error.message);
//     return null;
//   }
// };

// export default geminiResp;



// const geminiResp = async (command, assistantName, userName) => {
//   try {
//     const ApiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

//     // Remove assistant's name from command if it exists
//     const cleanedCommand = command.replace(new RegExp(assistantName, "ig"), "").trim();

//     const prompt = `
// You are a smart virtual assistant named ${assistantName}, created by ${userName}.
// You help users by answering questions, performing tasks, and guiding them.

// Your task is to return a JSON response with the following structure:

// {
//   "type": "general" | "Google Search" | "Youtube" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",
//   "userInput": "<relevant input>", 
//   "response": "<short helpful spoken reply>"
// }

// Rules:
// - Analyze the command and pick the correct "type".
// - If searching, trim userInput to just the query (e.g., "Play Shape of You" → "Shape of You").
// - Only return the JSON. No explanation, no extra text.

// Command: ${cleanedCommand}
// `;

//     const result = await axios.post(
//       ApiUrl,
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const rawText = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     // Extract JSON safely from response text
//     const jsonMatch = rawText.match(/{[\s\S]*}/);
//     if (!jsonMatch) {
//       console.error("Failed to parse JSON from Gemini response:", rawText);
//       return null;
//     }

//     const parsed = JSON.parse(jsonMatch[0]);
//     return parsed;

//   } catch (error) {
//     console.error("Gemini error:", error.response?.data || error.message);
//     return null;
//   }
// };

// export default geminiResp;


// import axios from "axios";

// const geminiResp = async (command, assistantName, userName) => {
//   try {
//     const ApiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

//     // Ensure environment variables are available
//     if (!process.env.GEMINI_API_URL || !process.env.GEMINI_API_KEY) {
//       throw new Error("Missing Gemini API URL or Key in environment variables.");
//     }

//     // Remove assistant name if mentioned in the command
//     const cleanedCommand = command.replace(new RegExp(assistantName, "ig"), "").trim();

//     // Prompt sent to Gemini
//     const prompt = `
// You are a virtual assistant named ${assistantName}, created by ${userName}.
// Your task is to return a clean JSON in the following structure ONLY:

// {
//   "type": "general" | "Google Search" | "Youtube" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",
//   "userInput": "<trimmed input>", 
//   "response": "<short helpful spoken reply>"
// }

// Rules:
// - Think about the intent and set the correct "type".
// - If user says "open calculator", type is "calculator_open".
// - If it's a search, extract only the query (e.g., "Search about cats" → "cats").
// - ONLY return valid JSON. No explanation, markdown, or extra text.

// User Command: ${cleanedCommand}
// `;

//     const result = await axios.post(
//       ApiUrl,
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const rawText = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!rawText) {
//       console.error("❌ No text in Gemini response:", result?.data);
//       return null;
//     }

//     const jsonMatch = rawText.match(/{[\s\S]*}/);
//     if (!jsonMatch) {
//       console.error("❌ Failed to extract JSON from Gemini:", rawText);
//       return null;
//     }

//     const parsed = JSON.parse(jsonMatch[0]);

//     // Safety check: Ensure "type" exists
//     if (!parsed.type) {
//       console.warn("⚠️ Gemini response missing 'type':", parsed);
//       return null;
//     }

//     return parsed;

//   } catch (error) {
//     console.error("🔥 Gemini error:", error.response?.data || error.message);
//     return null;
//   }
// };

// export default geminiResp;

import axios from "axios";

const geminiResp = async (command, assistantName, userName) => {
  try {
    const ApiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

    if (!process.env.GEMINI_API_URL || !process.env.GEMINI_API_KEY) {
      throw new Error("Missing Gemini API URL or Key in environment variables.");
    }

    const cleanedCommand = command.replace(new RegExp(assistantName, "ig"), "").trim();

    const prompt = `
You are a smart and helpful virtual assistant named "${assistantName}", created by "${userName}".
Your job is to understand the user's command and respond ONLY with a clean, valid JSON object in this format:

{
  "type": "<valid type from list below>",
  "userInput": "<trimmed command without assistant name or filler words>",
  "response": "<a short, friendly, and helpful spoken reply>"
}

Strict Rules:
- Do NOT include markdown, explanations, notes, or text outside the JSON.
- DO NOT change key names, spelling, or structure.
- Think carefully about intent before deciding the "type".
- Use only the types below:

Supported "type" values (with meanings):
- "general" → For regular questions, facts, jokes, greetings, conversations, etc if any answer you know provide brief answer to it
- "Google Search" → When user wants to search something on Google.
- "Youtube" or "youtube_play" → If user asks to play or search a video on YouTube.
- "get_time" → When user asks for current time.
- "get_date" → When user asks for today's date.
- "get_day" → When user asks for day of the week.
- "get_month" → When user asks what month it is.
- "calculator_open" → If user says open/launch calculator.
- "instagram_open" → If user asks to open Instagram.
- "facebook_open" → If user asks to open Facebook.
- "weather-show" → If user wants to check or see the weather.

Context:
- If the command is "search about space", then:
  "type": "Google Search",
  "userInput": "space",
  "response": "Sure! Searching about space."

Now based on this user command, return valid JSON only:
"${cleanedCommand}"
`;

    const result = await axios.post(
      ApiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("❌ No text in Gemini response:", result?.data);
      return null;
    }

    const jsonMatch = rawText.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      console.error("❌ Failed to extract JSON from Gemini:", rawText);
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.type) {
      console.warn("⚠️ Gemini response missing 'type':", parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("🔥 Gemini error:", error.response?.data || error.message);
    return null;
  }
};

export default geminiResp;
