import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

const updateDistributorController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id=req.params.id
        const updatedData=req.body;
        //updating the backend databases.
         const updatedDistributor=await prisma.distributor.update({
            where:{id:Number(id)},
            data:updatedData
         })

         // Log activity for distributor update
         try {
            await logActivity({
                action: "Distributor Updated",
                details: {
                    distributorId: updatedDistributor.id,
                    companyName: updatedDistributor.companyName,
                    changes: updatedData,
                    adminId: (req as any).adminId || null
                },
                distributorId: updatedDistributor.id
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

         return res.status(StatusCode.SUCCESS).json({
            message:"Updated Distributor",
            updatedDistributor
         })
    } catch (error) {
        console.log("Error while updaing distributor", error)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Error while updating distributor.")
    }
}
export default updateDistributorController