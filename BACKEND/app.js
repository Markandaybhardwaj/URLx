import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Explicitly configure dotenv at the top

import cors from "cors";
import mongoose from "mongoose";
import {nanoid} from "nanoid"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"
import passport from 'passport';
import './src/config/passport.config.js'; // This will execute the passport config file
import qr_code_routes from "./src/routes/qr_code.route.js"

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({//  
    origin: ['http://localhost:5173', 'https://localhost:5173'], // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(passport.initialize())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.use("/api/qrcodes", qr_code_routes)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(port,()=>{
    connectDB()
    console.log("Server is running on http://localhost:" + port);
})

// GET - Redirection 
