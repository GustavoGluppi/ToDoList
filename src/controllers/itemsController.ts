import { randomUUID } from "crypto";
import { Item } from "../types";

let items: Item[] = [];

export const getItems = () => {
  return items;
};

export const createItem = (title: string): Item => {
  const newItem: Item = {
    id: randomUUID(),
    title,
    checked: false,
  };
  items.push(newItem);
  return newItem;
};

export const deleteItem = (id: string): void => {
  const itemIndex: number = items.findIndex((el) => el.id === id);

  if (itemIndex === -1) {
    throw new Error("Item not found");
  }

  items.splice(itemIndex, 1);
};
