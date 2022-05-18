import config from "@lib/config";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import logger from "./lib/logger";
import { registerRoutes } from "./routes";

const server = fastify();

export const client1: PrismaClient = new PrismaClient({
  datasources: { db: { url: config.databaseUrl } },
});

export const client2 = new PrismaClient({
  datasources: { db: { url: config.backupDatabaseUrl } },
});

registerRoutes(server);

server.all("*", (request, reply) => {
  reply.status(404).send("Route does not exist");
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaugh Exception " + err);
  logger.warn("Shutting down server because of uncaught exception");

  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  const errorMsg = [`Unhandled Promise Rejection`, `Reason: ${reason}`].join(
    ",\n"
  );

  console.log({
    error: errorMsg,
  });

  // need to log the promise without stringifying it to properly
  // display all rejection info
  console.log(promise);

  // TODO: stream errors to sentry

  process.exit(1);
});
