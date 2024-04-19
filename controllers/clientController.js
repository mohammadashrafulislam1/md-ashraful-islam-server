import { ObjectId } from "mongodb";
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
// get single client
export const getOneClient = async(req, res)=>{
  try{
    const clientId =req.params.id;
  const client = await clientModel.findOne({_id: new ObjectId(clientId)});
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: 'Client not found' });
  }
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// get all clients
export const getClients = async(req, res)=>{
  try{
    const clients = await clientModel.find();
    if (clients) {
      res.json(clients);
    } else {
      res.status(404).json({ message: 'Clients not found' });
    }

  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// delete client
export const deleteClient = async (req, res)=>{
  const clientId = req.params.id;
  const deletedClient = await clientModel.deleteOne({_id: new ObjectId(clientId)})
  if(deleteClient){
    res.status(200).json({message: "Client successfully deleted."})
  }
  else{
    res.status(400).json({error: "Cloud not delete client data"})
  }
}
