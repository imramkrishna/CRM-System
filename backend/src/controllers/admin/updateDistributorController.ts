import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";

const updateDistributorController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id=req.params.id
        const updatedData=req.body;
        //updating the backend databases.
         const updatedDistributor=await prisma.distributor.update({
            where:{id:Number(id)},
            data:updatedData
         })
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