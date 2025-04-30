import z from "zod";
import { FastifyTypedInstance, Item } from "../types";
import {
  createItem,
  deleteItem,
  getItems,
  getSingleItem,
  modifyItem,
} from "../controllers/itemsController";

export async function routes(app: FastifyTypedInstance) {
  // Items tag
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
              description: z.string(),
              checked: z.boolean(),
              created_at: z.date(),
            })
          ),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Internal Server Error"),
        },
      },
    },
    async (req, res) => {
      try {
        return await getItems();
      } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
      }
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
          description: z.string(),
          checked: z.boolean().optional(),
        }),
        response: {
          201: z
            .object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              checked: z.boolean(),
              created_at: z.date(),
            })
            .describe("Item created successfully"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Internal Server Error"),
        },
      },
    },
    async (req, res) => {
      try {
        const { title, description, checked } = req.body;
        const newItem: Item = await createItem(title, description, checked);
        return res.status(201).send(newItem);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  );

  app.delete(
    "/item",
    {
      schema: {
        tags: ["item"],
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
        await deleteItem(id);
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

  app.put(
    "/item",
    {
      schema: {
        tags: ["item"],
        description: "Edit an existent item",
        body: z.object({
          id: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          checked: z.boolean().optional(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            checked: z.boolean(),
            created_at: z.date(),
          }),
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
      const { id, title, description, checked } = req.body;

      try {
        const modifiedItem: Item = await modifyItem(
          id,
          title,
          description,
          checked
        );
        return res.status(201).send(modifiedItem);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(404).send({ message: error.message });
        } else {
          return res.status(500).send({ message: "Internal Server Error" });
        }
      }
    }
  );

  // Item tag
  app.get(
    "/item/:id",
    {
      schema: {
        tags: ["item"],
        description: "Retrieve informations of a single item",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            checked: z.boolean(),
            created_at: z.date(),
          }),
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
      const { id } = req.params;

      try {
        const item: Item = await getSingleItem(id);
        res.status(200).send(item);
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
