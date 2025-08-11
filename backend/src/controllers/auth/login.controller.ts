import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { StatusCode } from '../../types';
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";

const prisma = new PrismaClient();

const loginController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: 'Email and password are required' });
        }
        // Find the user in the database
        const user = await prisma.distributor.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(StatusCode.NOT_FOUND).json({ message: 'User not found' });
        }

        // Here you would typically compare the password with the hashed password stored in the database
        // For simplicity, we are assuming a function `comparePassword` exists
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        // If login is successful, return a success response
        const refreshToken = await generateRefreshToken({ id: user.id, email: user.email, role: "distributor" });
        console.log("RefreshToken:", refreshToken)
        const accessToken = await generateAccessToken(refreshToken);
        // Store the refresh token in the database
        await prisma.distributorLoginSessions.upsert({
            where: { distributorId: user.id },
            update: { refreshToken },
            create: { refreshToken, distributorId: user.id }
        });
        //setting both refresh and access token in cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax', // Adjust as necessary for your application
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax', // Adjust as necessary for your application
            maxAge: 40 * 1000 // 40 seconds
            //15 * 60 * 1000 // 15 minutes
        });
        return res.status(StatusCode.SUCCESS).json({
            message: 'Login successful', user: {
                id: user.id,
                email: user.email,
                role: "distributor"
            }
        });
    } catch (error) {
        console.log("Error during login:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
export default loginController;