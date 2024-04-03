import { clientModel } from "../model/Clients.js";

export const addClient = async(req, res)=>{
    try {
        // Create a new client instance
        const newClient = new clientModel({
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          userSocialMedia: req.body.userSocialMedia
        });
    
        // Save the new client to the database
        const insertResult = await newClient.save();
    
        // Respond with the insert result
        res.status(201).json(insertResult);
      } catch (error) {
        // Handle error
        console.error("Error adding client:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}