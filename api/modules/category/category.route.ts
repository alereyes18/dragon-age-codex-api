import { FastifyInstance } from "fastify";
import { getCategoriesHandler, getCategoryHandler } from "./category.controller";
import { schema } from "./category.schema";
import { CategoryParams } from "@/types/categories";

async function categoryRoutes(server: FastifyInstance) {
	server.get("/", getCategoriesHandler);
	server.get<{ Params: CategoryParams }>("/:category", schema, getCategoryHandler);
}

export default categoryRoutes;
