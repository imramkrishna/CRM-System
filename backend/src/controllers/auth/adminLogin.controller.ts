import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import comparePassword from "../../utils/comparePassword";
import { StatusCode } from "../../types";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";

const adminLoginController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: 'Email and password are required' });
        }

        // Find the admin user in the database
        const adminUser = await prisma.admin.findUnique({
            where: { email }
        });

        if (!adminUser) {
            return res.status(StatusCode.NOT_FOUND).json({ message: 'Admin user not found with provided credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePassword(password, adminUser.password);

        if (!isPasswordValid) {
            return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Admin user not found with provided credentials' });
        }
        const refreshToken = await generateRefreshToken({ id: adminUser.id, email: adminUser.email, role: "admin" });
        // Generate access token using the refresh token
        const accessToken = await generateAccessToken(refreshToken);
        // Store the refresh token in the database
        //store or update the admin login session
        await prisma.adminLoginSessions.upsert({
            where: { adminId: adminUser.id },
            update: { refreshToken },
            create: {
                refreshToken,
                adminId: adminUser.id,
            }
        });
        //setting both refresh and access token in cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // Keep same as localhost for debugging
            sameSite: 'lax', // Use lax instead of none
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // Keep same as localhost for debugging
            sameSite: 'lax', // Use lax instead of none
            maxAge: 40 * 1000 // 40 seconds
            //15 * 60 * 1000 // 15 minutes
        });
        return res.status(StatusCode.SUCCESS).json({
            message: 'Login successful',
            user: {
                id: adminUser.id,
                email: adminUser.email,
                role: "admin"
            }
        });
    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
export default adminLoginController;