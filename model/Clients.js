import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName: { type: String},
    clientEmail: { type: String },
    clientSocialMedia: { type: String }
  });
  
export const clientModel = mongoose.model("clients", clientSchema);