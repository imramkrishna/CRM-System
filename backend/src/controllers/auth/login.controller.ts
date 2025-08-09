import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { StatusCode } from '../../types';
import bcrypt from "bcrypt"

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

        return res.status(StatusCode.SUCCESS).json({ message: 'Login successful', user });
    } catch (error) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
export default loginController;