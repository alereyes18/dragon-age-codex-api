/** @format */

import { kysely } from "@/db/kysely/database";
import { DB } from "@/db/kysely/types";
import { ExpressionBuilder } from "kysely";

export async function findEntries(sortCategory: any | "entry_id", sortOrder: string, categories: string[] | number[], games: string[]) {
	console.log("Find Entries:", sortCategory, sortOrder, categories, games);
	function buildCategoryExpression(eb: ExpressionBuilder<DB, "entries" | "appearance_details" | "categories">) {
		let expression;
 		if (typeof categories[0] == "number") {
			const numArray = categories.map(category => parseInt(category as string));
			console.log(numArray);
			console.log("TYPE NUMBER");
			expression = eb(
				"appearance_details.category_id",
				"in",
				categories.map(category => parseInt(category as string))
			);
		} else if (typeof categories[0] == "string") {
			console.log("TYPE: STRING");
			expression = eb("appearance_details.category", "in", categories as string[]);
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
		.orderBy(sortCategory, sortOrder as "asc" | "desc")
		.execute();
	console.log((await response).length);
	return response;
}

/*
entries?sortBy, games,


*/
