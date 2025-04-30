import { randomUUID } from "crypto";
import { Item } from "../types";
import { itemModel } from "../models/item";

export const getItems = async (): Promise<Item[]> => {
  return await itemModel.find().lean();
};

export const createItem = async (
  title: string,
  description: string,
  checked?: boolean
): Promise<Item> => {
  const newItem: Item = {
    id: randomUUID(),
    title,
    description,
    checked: checked ?? false,
    created_at: new Date(),
  };
  const modelInstance = new itemModel(newItem);
  await modelInstance.save();
  return newItem;
};

export const deleteItem = async (id: string): Promise<void> => {
  const deleteResult = await itemModel.deleteOne({ id: id });

  if (deleteResult.deletedCount === 0) {
    throw new Error("Item not found");
  }
};

export const modifyItem = async (
  id: string,
  title?: string,
  description?: string,
  checked?: boolean
): Promise<Item> => {
  const item = await itemModel.findOne({ id: id });

  if (!item) {
    throw new Error("Item not found");
  }

  const updateObj: Item = {
    id: item.id,
    title: title ?? item.title,
    description: description ?? item.description,
    checked: checked ?? item.checked,
    created_at: item.created_at,
  };

  if (title) updateObj.title = title;
  if (description) updateObj.description = description;
  if (checked !== undefined) updateObj.checked = checked;

  const updatedItem = await itemModel
    .findOneAndUpdate({ id: id }, updateObj, { new: true })
    .lean();

  return updatedItem as Item;
};

export const getSingleItem = async (id: string): Promise<Item> => {
  const item = await itemModel.findOne({ id: id }).lean();

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
};
