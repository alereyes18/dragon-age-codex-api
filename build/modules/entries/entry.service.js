/** @format */
import { kysely } from "@/db/kysely/database";
export async function findEntries(sortCategory, sortOrder, categories, games) {
    console.log("Find Entries:", sortCategory, sortOrder, categories, games);
    function buildCategoryExpression(eb) {
        let expression;
        if (typeof categories[0] == "number") {
            const numArray = categories.map(category => parseInt(category));
            console.log(numArray);
            console.log("TYPE NUMBER");
            expression = eb("appearance_details.category_id", "in", categories.map(category => parseInt(category)));
        }
        else if (typeof categories[0] == "string") {
            console.log("TYPE: STRING");
            expression = eb("appearance_details.category", "in", categories);
        }
        console.log("EXPR: ", expression);
        return expression;
    }
    const response = kysely
        .selectFrom("appearance_details")
        .innerJoin("categories", "categories.id", "appearance_details.category_id")
        .innerJoin("entries", "entries.entry_id", "appearance_details.entry_id")
        .select([
        "entries.entry_id",
        "appearance_details.game_id",
        "categories.long_name as category",
        "categories.id as category_id",
        "entries.title",
        "entries.headline",
        "entries.content",
    ])
        .where(({ eb, and }) => {
        const categoryExpression = buildCategoryExpression(eb);
        return and([eb("appearance_details.game_id", "in", games), categoryExpression ? categoryExpression : eb.val(true)]);
    })
        .orderBy(sortCategory, sortOrder)
        .execute();
    console.log((await response).length);
    return response;
}
/*
entries?sortBy, games,


*/
//# sourceMappingURL=entry.service.js.map