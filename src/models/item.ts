import { model, Schema } from "mongoose";
import { Item } from "../types";

const itemSchema = new Schema<Item>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true },
  created_at: { type: Date, required: true },
});

export const itemModel = model<Item>("Item", itemSchema);
