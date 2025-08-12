import { Response,Request } from "express";
const manualOrderRequestController=async(req:Request,res:Response):Promise<Response>=>{
    try {
         
        return res.status(200).json({ message: "Manual order request processed successfully" });
    } catch (error) {
        console.error("Error processing manual order request:", error);
        return res.status(500).json({ error: "Failed to process manual order request" });
    }
}