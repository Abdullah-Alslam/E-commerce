import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true },
    about: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
