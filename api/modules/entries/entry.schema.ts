import { RouteShorthandOptions } from "fastify";

const EntryQuerystringJsonSchema = {
	type: "object",
	properties: {
		games: {
			type: "array",
			items: {
				type: "number",
				enum: [1, 2, 3],
			errorMessage: "The 'games' property should be a list of numbers. Allowed values are 1, 2, and 3. You can provide these values as a comma-separated list, e.g., 'games=1,2,3', or as multiple query parameters, e.g., 'game=1&game=2&game=3'."
			},
		},
		categories: {
			oneOf: [
				{
					type: "array",
					items: {
						transform: ["trim"],
						type: "string",
						enum: [
							"art_of_war",
							"books_and_songs",
							"characters",
							"characters_inquisition",
							"controls",
							"crafting_materials",
							"creatures",
							"culture_and_history",
							"groups",
							"history",
							"items",
							"letters_and_notes",
							"lore",
							"magic",
							"magic_and_religion",
							"maps",
							"notes",
							"places",
							"quest_related",
							"spell_combinations",
							"tales",
							"tutorials",
						],
					},
				},
				{
					type: "array",
					items: {
						type: "number",
						enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
					},
				},
			],
			errorMessage: "Property categories must be EITHER an array of numbers, or strings, types cannot be mixed. See GET /v1/categories for a list of all categories and their ID's."
		},
		sortBy: { type: "string", enum: ["-entry_id", "-title", "entry_id", "title"] },
		sortOrder: { type: "string", enum: ["asc", "desc"] },
	},
	additionalProperties: false,
	errorMessage: {
		additionalProperties: "Allowed properties are 'categories', 'games', 'sortBy', and 'sortOrder'",
		properties: {
			sortBy: "sortBy must be 'id' or 'title'. See GET /v1/categories for a list of valid values.",
			game: "Game error",
			category: "Category error",
		},
		type: "TYPE",
		oneOf: "ONE OF",
		 
	},
};
export const schema: RouteShorthandOptions = {
	schema: {
		querystring: EntryQuerystringJsonSchema,
	},
	// preValidation: (req, reply) => {
	// 	// use preValidation to parse sortBy
	// 	// - check if there is a + or -
	// 	// - check if the category is valid
	// 	// transform the payload into { sortBy: string, sortOrder: 'asc' or 'desc}
	// 	// throw errors if sortOrder or sortBy is not allowed
	// 	if (req.query["sortBy"]) {
	// 		console.log("Prevalidation: sortBy found");
	// 	}
	// },
	attachValidation: true,
};
