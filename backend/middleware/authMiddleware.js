import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const protect = async(req,res,next)=>{
    try {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized, no token provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        //Get user from token
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
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
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }
        req.user = user
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }

    res.status(401).json({
      success: false,
      message: 'Not authorized',
      error: error.message,
    });
    }
}