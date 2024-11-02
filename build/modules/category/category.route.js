import { getCategoriesHandler, getCategoryHandler } from "./category.controller";
import { schema } from "./category.schema";
async function categoryRoutes(server) {
    server.get("/", getCategoriesHandler);
    server.get("/:category", schema, getCategoryHandler);
}
export default categoryRoutes;
//# sourceMappingURL=category.route.js.map