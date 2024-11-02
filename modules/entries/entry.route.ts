import { FastifyInstance, FastifySchema, RouteShorthandOptions } from "fastify";
import getEntriesHandler from "./entry.controller";
import { schema } from "./entry.schema";

async function entryRoutes(server: FastifyInstance) {
  server.get("/", schema, getEntriesHandler);
}

export default entryRoutes;
