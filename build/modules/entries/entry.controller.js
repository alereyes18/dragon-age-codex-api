import { findEntries } from "./entry.service";
import { handleValidationError } from "../../utils/validate";
async function getEntriesHandler(request, reply) {
    if (!handleValidationError(request, reply)) {
        // @ts-ignore-next
        const { sortBy, categories, games } = request.query;
        let sortCategory = "entry_id";
        let sortOrder = "asc";
        if (sortBy) {
            if (sortBy[0] == "-") {
                sortOrder = "desc";
                sortCategory = sortBy.substring(1);
            }
            else {
                sortCategory = sortBy;
            }
        }
        let queryCategories;
        queryCategories = categories
            ? categories.map((category) => {
                //if a number, parse array of nums, return array ofnums
                //if str, parse array of strs
                if (parseInt(category)) {
                    return parseInt(category);
                }
                else {
                    return category.trim();
                }
            })
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        // const queryCategories = categories ? categories.map((category: string | number) => category.toString().trim()) : null;
        let queryGames;
        queryGames = games ? games.map((game) => "G" + game) : ["G1", "G2", "G3"];
        console.log("queryCategories: ", queryCategories);
        const response = await findEntries(sortCategory, sortOrder, queryCategories, queryGames);
        reply.send(response);
    }
}
export default getEntriesHandler;
//# sourceMappingURL=entry.controller.js.map