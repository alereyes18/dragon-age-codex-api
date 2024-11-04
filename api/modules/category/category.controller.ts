import { FastifyReply, FastifyRequest } from "fastify";
import { findCategories, findCategory } from "./category.service";
import { CategoryParams } from "@/types/categories";
import { handleValidationError } from "@/utils/validate";

// Handle GET /v1/categories 
async function getCategoriesHandler(request: FastifyRequest, reply: FastifyReply) {
	if (!handleValidationError(request, reply)) {
		const categories = await findCategories();
		reply.send(JSON.stringify(categories, null, 4));
	}
}

// Handle GET /v1/categories/:category
async function getCategoryHandler(request: FastifyRequest<{ Params: CategoryParams }>, reply: FastifyReply) {
	if (!handleValidationError(request, reply)) {
		const categoryParam = request.params.category;
		const category = await findCategory(categoryParam);
		reply.send(JSON.stringify(category, null, 4));
	}
}

export { getCategoriesHandler, getCategoryHandler };
