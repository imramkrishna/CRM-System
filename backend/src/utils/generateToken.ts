import { User } from "../types";
import jwt from 'jsonwebtoken';
import { loginSession, PrismaClient, distributor } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
export async function generateAccessToken(refreshToken: string): Promise<string> {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    const user = jwt.verify(refreshToken, JWT_SECRET) as User;
    if (!user) {
        throw new Error("Invalid refresh token");
    }
    const userExists = await prisma.distributor.findUnique({ where: { email: user.email } });
    if (!userExists) {
        throw new Error("User does not exist");
    }
    const isMatch = await prisma.loginSession.findUnique({ where: { distributorId: userExists.id, refreshToken } });
    if (!isMatch) {
        throw new Error("Invalid refresh token");
    }
    const accessToken = jwt.sign({ email: userExists.email, id: userExists.id }, JWT_SECRET, { expiresIn: '15m' });
    if (!accessToken) {
        throw new Error("Failed to generate access token");
    }
    return accessToken;
}

export function generateRefreshToken(user: User): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    const refreshToken = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    if (!refreshToken) {
        throw new Error("Failed to generate refresh token");
    }
    return refreshToken;
}