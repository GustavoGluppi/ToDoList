import z from "zod";
import { FastifyTypedInstance } from "../types";
import {
  createItem,
  deleteItem,
  getItems,
} from "../controllers/itemsController";
import { time } from "console";

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "Get all To-do items created",
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              checked: z.boolean(),
            })
          ),
        },
      },
    },
    async () => {
      return getItems();
    }
  );

  app.post(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "Create a new ToDo item",
        body: z.object({
          title: z.string(),
        }),
        response: {
          201: z
            .object({
              id: z.string(),
              title: z.string(),
              checked: z.boolean(),
            })
            .describe("Item created successfully"),
        },
      },
    },
    async (req, res) => {
      const { title } = req.body;
      const newItem = createItem(title);
      return res.status(201).send(newItem);
    }
  );

  app.delete(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "Deletes an especific item",
        body: z.object({
          id: z.string(),
        }),
        response: {
          204: z.null().describe("Item deleted successfully"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("item not found"),
          505: z
            .object({
              message: z.string(),
            })
            .describe("Internal Server Error"),
        },
      },
    },
    async (req, res) => {
      const { id } = req.body;
      try {
        deleteItem(id);
        return res.status(204).send();
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(404).send({ message: error.message });
        } else {
          return res.status(500).send({ message: "Internal Server Error" });
        }
      }
    }
  );
}
