import {} from "ajv-errors";
import { RouteShorthandOptions } from "fastify";

const CategoryParamsJsonSchema = {
	errorMessage: {
		type: "Must be a number or string.",
		enum: "Invalid category. See GET /v1/categories for a list of valid categories by name or ID.",
		properties: {
			category: ":category should be a named category, or a category ID. See GET /v1/categories for a list of valid options",
		},
	},
	type: "object",
	properties: {
		category: {
			anyOf: [
				{
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
				{ type: "number", enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
			],
		},
	},

	additionalProperties: false,
};
export const schema: RouteShorthandOptions = {
	schema: {
		params: CategoryParamsJsonSchema,
	},
	attachValidation: true,
};