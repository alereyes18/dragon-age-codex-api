import test, { describe } from "node:test";
import server from "../server";
import assert from "node:assert";

describe("GET /healthcheck", () => {
	test("Should return OK", async () => {
		const response = await server.inject({
			method: "GET",
			path: "/healthcheck",
		});
		assert.equal(response.statusCode, 200);
		assert.deepEqual(response.json(), { status: "OK" });
	});
});