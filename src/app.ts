// Importing libs
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes/itemsRoutes";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
dotenv.config();

connectDB();

// Creates and configure the application
export const createApp = () => {
  // Creating app instance
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  // Using ZOD as validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Setting CORS to all origins
  app.register(fastifyCors, { origin: "*" });

  // Saying Fastify to use Swagger
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "To-Do List APi",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  // Linking app routes
  app.register(routes);

  return app;
};
