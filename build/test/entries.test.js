import { describe, it } from "node:test";
import server from "../server";
import assert from "node:assert";
/*
SORT:
/v1/entries?sortBy=title  PASS
/v1/entries?sortBy=id PASS

/v1/entries?sortBy=-title PASS
/v1/entries?sortBy=-id PASS

/v1/entries?sortBy=abc FAIL
/v1/entries?sortBy=-abc FAIL

GAMES:
/v1/entries?games=4 FAIL
/v1/entries?games=1,2,3 PASS
/v1/entries/games=1,2 PASS

CATEGORIES:
/v1/entries?category=tutorials,controls PASS
/v1/entries?category=tutorials,tututu FAIL
/v1/entries?category=tututu FAIL
/v1/entries?sortBy=+title&games=1,2,3&category=books_and_songs,tutorials



*/
describe("ENDPOINT: /v1/entries", () => {
    describe("GET /v1/categories", async () => {
        it("should return a status code of 200, and response.json().length of 22", async () => {
            const response = await server.inject({
                method: "GET",
                path: "/v1/categories",
            });
            assert.equal(response.statusCode, 200);
            assert.equal(response.json().length, 22);
            // console.log({ statusCode: 200, categoriesLength: response.json().length });
        });
    });
    describe("GET /v1/categories/:category");
    it("should take in a category ID, and return a status code of 200, and response.json() should return the id and category for the tutorials category", async () => {
        const expected = { id: 23, category: "tutorials" };
        const response = await server.inject({
            method: "GET",
            path: "/v1/categories/23",
        });
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.json(), expected);
    });
    it("should take in a category NAME, and return a status code of 200, and response.json() should return the id and category for the books_and_songs category", async () => {
        const expected = { id: 2, category: "books_and_songs" };
        const response = await server.inject({
            method: "GET",
            path: "/v1/categories/books_and_songs",
        });
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.json(), expected);
    });
    it("should return an error when an invalid category NAME, or ID is passed", async () => {
        const invalidResponse = {
            statusCode: 400,
            error: "Bad Request",
            message: "ERROR: :category should be a named category, or a category ID. See GET /v1/categories for a list of valid options",
        };
        const response_name = await server.inject({
            method: "GET",
            path: "/v1/categories/invalid",
        });
        const response_id = await server.inject({
            method: "GET",
            path: "/v1/categories/99",
        });
        assert.deepEqual(response_id.json(), invalidResponse);
        assert.deepEqual(response_name.json(), invalidResponse);
    });
});
//# sourceMappingURL=entries.test.js.map