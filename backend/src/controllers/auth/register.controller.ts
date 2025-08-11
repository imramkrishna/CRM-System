import { Request, Response } from 'express';
import prisma from '../../utils/prismaClient';
import { StatusCode } from '../../types';
import bcrypt from "bcrypt";

const registerController = async (req: Request, res: Response) => {
    const { ownerName, email, phone, companyName, message, address, password } = req.body;

    try {
        // Validate input
        if (!ownerName || !email || !phone || !companyName || !message || !address || !password) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: 'All fields are required' });
        }

        // Check if user already exists

        const existingUser = await prisma.distributor.findUnique({
            where: { email }
        }) || await prisma.pendingRegistration.findUnique({
            where: { email }
        }) || await prisma.distributor.findUnique({
            where: { phone }
        }) || await prisma.pendingRegistration.findUnique({
            where: { phone }
        });
        if (existingUser) {
            return res.status(StatusCode.CONFLICT).json({ message: 'User already exists with that email or phone number' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.pendingRegistration.create({
            data: {
                ownerName,
                email,
                phone,
                companyName,
                address,
                message,
                password: hashedPassword
            }
        });

        return res.status(StatusCode.CREATED).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export default registerController;