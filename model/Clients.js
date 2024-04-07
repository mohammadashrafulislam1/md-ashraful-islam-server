import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    userName: { type: String},
    userEmail: { type: String },
    userSocialMedia: { type: String }
  });
  
export const clientModel = mongoose.model("clients", clientSchema);