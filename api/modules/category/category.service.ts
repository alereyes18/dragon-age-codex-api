import { kysely } from "@/db/kysely/database";

 
export async function findCategories() {
	return kysely.selectFrom("categories").selectAll().orderBy("id asc").execute();
	// return prisma.categories.findMany({
	// 	orderBy: {
	// 		id: "asc",
	// 	},
	// 	select: {
	// 		category: true,
	// 		id: true,
	// 	},
	// });
}

export async function findCategory(category: string | number) {
	console.log(category);
	console.log(typeof category);
	if (typeof category == "number") {
		return kysely.selectFrom("categories").selectAll().where("id", "=", category).executeTakeFirst(); //without executeTakeFirst, singleton array is returned
	} else if (typeof category == "string") {
		console.log("category is string");
		const res =  await kysely.selectFrom("categories").selectAll().where("category", "=", category).executeTakeFirst();
		console.log(res)
		return res
	} else {
		console.error("Category must be string or number.");
	}
}
