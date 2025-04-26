import { randomUUID } from "crypto";
import { Item } from "../types";
import { boolean } from "zod";

let items: Item[] = [];

export const getItems = (): Item[] => {
  return items;
};

export const createItem = (
  title: string,
  description: string,
  checked?: boolean
): Item => {
  const newItem: Item = {
    id: randomUUID(),
    title,
    description,
    checked: checked ?? false,
    created_at: new Date(),
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

export const modifyItem = (
  id: string,
  title?: string,
  description?: string,
  checked?: boolean
): Item => {
  const itemIndex: number = items.findIndex((el) => el.id === id);

  if (itemIndex === -1) {
    throw new Error("Item not found");
  }

  const item: Item = items[itemIndex];

  items[itemIndex] = {
    id: item.id,
    title: title ?? item.title,
    description: description ?? item.description,
    checked: checked ?? item.checked,
    created_at: item.created_at,
  };

  return items[itemIndex];
};
