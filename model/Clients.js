import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userSocialMedia: { type: String }
  });
  
export const clientModel = mongoose.model("clients", clientSchema);