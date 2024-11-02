import getEntriesHandler from "./entry.controller";
import { schema } from "./entry.schema";
async function entryRoutes(server) {
    server.get("/", schema, getEntriesHandler);
}
export default entryRoutes;
//# sourceMappingURL=entry.route.js.map