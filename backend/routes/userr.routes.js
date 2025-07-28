import express from "express"

import { asktoasstistant, getCurrentUSer, updateAssistnat } from "../controllers/user.controllers.js"
import isAuth from "../middleware/isAuth.js"

import upload from "../middleware/multer.js"

const userrRouter=express.Router()

userrRouter.get("/current",isAuth,getCurrentUSer)
userrRouter.post("/update",isAuth,upload.single("assistantimage"),updateAssistnat)
userrRouter.post("/ask",isAuth,asktoasstistant)
export default userrRouter