import prisma from "./prismaClient";

interface ActivityLogData {
    distributorId?: number | null;
    action: string;
    details?: any;
}

export const logActivity = async (data: ActivityLogData): Promise<void> => {
    try {
        await prisma.activityLog.create({
            data: {
                distributorId: data.distributorId || null,
                action: data.action,
                details: data.details || null
            }
        });
    } catch (error) {
        // Log the error but don't interrupt the main flow
        console.error('Failed to log activity:', error);
    }
};
