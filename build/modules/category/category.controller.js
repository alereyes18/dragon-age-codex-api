import { findCategories, findCategory } from "./category.service";
import { handleValidationError } from "@/utils/validate";
// Handle GET /v1/categories 
async function getCategoriesHandler(request, reply) {
    if (!handleValidationError(request, reply)) {
        const categories = await findCategories();
        reply.send(categories);
    }
}
// Handle GET /v1/categories/:category
async function getCategoryHandler(request, reply) {
    if (!handleValidationError(request, reply)) {
        const categoryParam = request.params.category;
        const category = await findCategory(categoryParam);
        reply.send(category);
    }
}
export { getCategoriesHandler, getCategoryHandler };
//# sourceMappingURL=category.controller.js.map