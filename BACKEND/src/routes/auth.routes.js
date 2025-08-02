import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { register_user, login_user,logout_user,get_current_user } from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { cookieOptions } from "../config/config.js"

const router = express.Router()

router.post("/register", register_user)
router.post("/login", login_user)
router.post("/logout", logout_user)
router.get("/me", authMiddleware,get_current_user)



// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    // On successful authentication, user object is attached to request by Passport
    const user = req.user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })

    // Send the token in a cookie and redirect to the frontend dashboard
    res.cookie("accessToken", token, cookieOptions)
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`)
  }
)

export default router;