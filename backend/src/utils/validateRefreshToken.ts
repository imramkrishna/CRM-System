import { User } from "../types";
import prisma from "./prismaClient";
async function validateRefreshToken(refreshToken: string, user: User): Promise<boolean> {
    try {
        if (user.role == "admin") {
            // Check if the refresh token is valid
            const isValid = await prisma.adminLoginSessions.findFirst({
                where: {
                    refreshToken,
                    adminId: user.id
                }
            });
            if (isValid) return true;
            return false;
        }
        if (user.role == "distributor") {
            // Check if the refresh token is valid
            const isValid = await prisma.distributorLoginSessions.findFirst({
                where: {
                    refreshToken,
                    distributorId: user.id
                }
            });
            if (isValid) return true;
            return false;
        }
        return false;

    } catch (error) {
        console.error("Error validating refresh token:", error);
        return false;
    }
}
export default validateRefreshToken;