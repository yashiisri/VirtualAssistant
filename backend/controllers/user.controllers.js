// import uploadoncloudinary from "../config/cloudinary.js"
// import User from "../models/user.model.js"
// export const getCurrentUSer=async(req,res)=>{
//     try {
//         const userId=req.userId
//         const user=await User.findById(userId).select("password")
//         if(!user){
//             return res.status(400).json({message:"user not found"})
//         }
//                     return res.status(200).json(user)
//     } catch (error) {
//         return res.status(400).json({message:"get current user error"})
        
//     }
// }

// export const updateAssistnat=async(req,res)=>{
//     try {
//         const {assName,imageUrl}=req.body
//         const assistantimage;
//         if(req.file){
//             assistantimage=await uploadoncloudinary(req.file.path)
//         }
//         else{
//             assistantimage=imageUrl
//         }
//         const user=await User.findByIdAndUpdate(req.userId,{
//             assistantName,assistantImage
//         },{new:true}).select("-password")
//         return res.status(200).json(user)

//     } catch (error) {
        
//     }

// }



import { response } from "express";
import uploadoncloudinary from "../config/cloudinary.js";
import geminiResp from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment"

export const getCurrentUSer = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(400).json({ message: "Get current user error" });
  }
};
export const updateAssistnat = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file) {
      assistantImage = await uploadoncloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,        // ✅ corrected
        assistantImage        // ✅ corrected case
      },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update assistant error:", error);
    return res.status(500).json({ message: "Failed to update assistant" });
  }
};


export const asktoasstistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command)
    user.save()
    const username = user.name;
    const assistantName = user.assistantName;

    // result is already a parsed object from geminiResp
    const result = await geminiResp(command, assistantName, username);

    if (!result || !result.type) {
      return res.status(400).json({ message: "Invalid response from Gemini" });
    }

    const { type, userInput, response } = result;

    switch (type) {
      case 'get_date':
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`
        });

      case 'get_time':
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm:A")}`
        });

      case 'get_day':
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`
        });

      case 'get_month':
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`
        });

      case 'Google Search':
      case 'Youtube':
      case 'youtube_play':
      case 'general':
      case 'calculator_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'weather-show':
      return res.json({ type, userInput, response });

      default:
        return res.status(400).json({ response: "I did not understand the command" });
    }
    return res.status.json


} catch (error) {
    console.error("Assistant error:", error.message);
    return res.status(500).json({ response: "Ask assistant error" });
  }
};

