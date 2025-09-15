import { Request, Response } from "express"
import prisma from "../../utils/prismaClient"
import { StatusCode } from "../../types"
import { distributor, pendingRegistration } from "@prisma/client"
import { logActivity } from "../../utils/activityLogger"

const verifyPendingRegistrationController = async (req: Request, res: Response): Promise<Response> => {
    console.log('Verifying distributor:', req.body);
    const { email } = req.body;

    try {
        // Check if the distributor exists
        const existingDistributor = await prisma.distributor.findUnique({
            where: { email }
        });

        if (existingDistributor) {
            return res.status(StatusCode.CONFLICT).json({ message: 'Distributor already exists' });
        }

        // Check if the distributor is in the pending registrations
        const existingPendingRegistration = await prisma.pendingRegistration.findUnique({
            where: { email }
        });

        if (!existingPendingRegistration) {
            return res.status(StatusCode.NOT_FOUND).json({ message: 'Pending registration not found' });
        }
        const newDistributor = await prisma.distributor.create({
            data: {
                ownerName: existingPendingRegistration.ownerName,
                email: existingPendingRegistration.email,
                phone: existingPendingRegistration.phone,
                companyName: existingPendingRegistration.companyName,
                address: existingPendingRegistration.address,
                password: existingPendingRegistration.password
            }
        });
        // Delete the pending registration after verification
        await prisma.pendingRegistration.delete({
            where: { email }
        });

        // Log activity for distributor verification
        try {
            await logActivity({
                action: "Distributor Verified",
                details: {
                    distributorId: newDistributor.id,
                    email: newDistributor.email,
                    companyName: newDistributor.companyName,
                    verifiedBy: (req as any).adminId || "admin"
                },
                distributorId: newDistributor.id
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        // If distributor exists, return their information
        return res.status(StatusCode.SUCCESS).json({ message: 'Distributor verified successfully', distributor: newDistributor });
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}
export default verifyPendingRegistrationController;