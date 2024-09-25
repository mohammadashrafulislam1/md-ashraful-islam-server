import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName: { type: String},
    clientPhoto:{type: String},
    clientEmail: { type: String },
    clientSocialMedia: { type: String },
    created_at:{type: Date, default: Date.now}
  });
  
export const clientModel = mongoose.model("clients", clientSchema);