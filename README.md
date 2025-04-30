# ToDo List API

A simple ToDo List API built with Fastify, Swagger, and MongoDB. This API allows you to manage a to-do list with basic functionalities like creating, listing, editing, and deleting items.

## Endpoints

### `ITEMS` Category

- **POST** `/items`

  - Create a new ToDo item.
  - **Body**: JSON object with `title`, `description`, `checked`, and `created_at` fields.

- **GET** `/items`
  - Get all ToDo items.

### `ITEM` Category

- **GET** `/items/{id}`

  - Get a specific ToDo item by ID.

- **DELETE** `/items/{id}`

  - Delete a specific ToDo item by ID.

- **PUT** `/items/{id}`
  - Update a specific ToDo item by ID.
  - **Body**: JSON object with `title`, `description`, and `checked` fields.

## Technologies

- **Fastify**: A fast and low-overhead web framework for Node.js.
- **Swagger**: Auto-generated API documentation for your endpoints.
- **MongoDB**: A NoSQL database to store the to-do items.
- **Mongoose**: A MongoDB ODM (Object Data Modeling) library for Node.js.
