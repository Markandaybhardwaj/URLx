import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) =>{
    return nanoid(length);
}

const JWT_SECRET = process.env.JWT_SECRET || 'this-is-a-temporary-secret-key';

export const signToken = async (payload) =>{
    return await jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token) =>{

    const decoded = jsonwebtoken.verify(token, JWT_SECRET)
    return decoded
}