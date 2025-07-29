import express from "express"
import { login, signup, logout, onboard } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"


const router = express.Router()


//authetication mainpoints
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/onboarding", protectRoute, onboard);

//forget-password
//reset email

//checks if user is logged in or not 
router.get("/me", protectRoute, (req, res)=>{
  res.status(200).json({success: true, user: req.user})
})

export default router