import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';


const prisma = new PrismaClient();


export const registerUser = async(req,res)=>{
    try {
        const {email,password,firstName,lastName} = req.body
    
        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }
        const existingUser = await prisma.user.findUnique({
            where:{email}
        })
    
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User with this email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await prisma.user.create({
            data:{
               firstName,
               lastName,
               email,
               password:hashedPassword
            }
        })
        const token = generateToken(user.id)
        const {password:_, ...userResponse} = user
        res.status(201).json({
            success:true,
            data:{
                user:userResponse,
                token
            },
            message:"Registration Successfull"
        })
    } catch (error) {
        console.error("Register error:",error)
        res.status(500).json({
            success:false,
            message:"Server error during registration",
            error:error.message
        })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide email and password"
            })
        }
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }
        const token = generateToken(user.id)
        const {password:_,...userResponse} = user
        res.status(200).json({
            success:true,
            data:{
                user:userResponse,
                token
            },
            message:"Login Successfull"
        })
    } catch (error) {
        console.error("Login Error",error)
        res.status(500).json({
            success:false,
            message:"Server error during login",
            error:error.message
        })
    }
}

export const getCurrentUser = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.id
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                type:true,
                createdAt:true,
                updatedAt:true
            }
        })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            data:{user},
            message:"User retrieved successfully"
        })
    } catch (error) {
        console.error("Get current user error",error)
        res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message
        })
    }
}