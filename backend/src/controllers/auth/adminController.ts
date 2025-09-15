import express from "express";
import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import encryptPassword from "../../utils/encryptPassword";
import { logActivity } from "../../utils/activityLogger";

const adminController = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Here you would typically handle the logic for creating an admin user
        // For example, you might check if the user is already an admin, create a new admin, etc.
        // This is just a placeholder response.
        const { email, password } = req.body;
        const hashedPassword = await encryptPassword(password);
        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        });
        if (existingAdmin) {
            return res.status(409).json({ error: "Admin user already exists" });
        }
        const newAdmin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        // Log activity for admin creation
        try {
            await logActivity({
                action: "Admin Created",
                details: {
                    adminId: newAdmin.id,
                    email: newAdmin.email,
                    createdBy: (req as any).adminId || "system"
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(200).json({ message: "Admin user created successfully", user: newAdmin });
    } catch (error) {
        console.error("Error creating admin user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export default adminController;