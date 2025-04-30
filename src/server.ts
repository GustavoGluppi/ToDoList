import { createApp } from "./app";

const app = createApp();

// Making app listen to PORT
const PORT: number = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }).then(() => {
  console.log("HTTP server running.");
});
