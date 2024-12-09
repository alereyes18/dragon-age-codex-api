import fastifySwagger from "@fastify/swagger";
("@fastify/swagger");
import qs from "qs";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import categoryRoutes from "./modules/category/category.route";
import getPrefix from "./utils/getPrefix";
import entryRoutes from "./modules/entries/entry.route";

import { ajv } from "./ajv";
import { writeFile, writeFileSync } from "fs";
const server = fastify({
	// Some customer error formatting
	schemaErrorFormatter: errors => {
		const errorMessage = errors.map(error => "ERROR: " + error.message?.trim()).join(", ");
		return new Error(errorMessage);
	},

	// Allow query params like game=1,2,3 so we dont have do to game=1&game=2&game=3
	querystringParser: str =>
		qs.parse(str, {
			comma: true,
		}),
});

// Setting a custom error handler allows us to customize how errors look.
// Default behavior by Fastify is to return only one error message.
// With this, if multiple errors occur, we send all of them.
server.setErrorHandler(function (error, request: FastifyRequest, reply: FastifyReply) {
	if (error.validation) {
		if (error.validation.length > 1) {
			// If multiple errors, create an array of error messages
			const messages = error.validation.map((err: any) => ({ error: err.message }));
			reply.status(400).type("application/json").send({
				statusCode: 400,
				code: "FST_ERR_VALIDATION",
				error: "Bad Request",
				messages: messages,
			});
		} else {
			reply.status(400).type("application/json").send({
				// If single error ...
				statusCode: 400,
				code: "FST_ERR_VALIDATION",
				error: "Bad Request",
				message: error.message,
			});
		}
	} else {
		// If the error is not a validation error ...
		reply.status(500).send({ error: "Internal Server Error" });
	}
});

server.setValidatorCompiler(opt => ajv.compile(opt.schema));

const registerRoutes = async () => {
	// Register fastifySwagger with the OpenAPI version to generate the spec.yaml file. v 3.1.0 allows us to have errorMessage in the schema so we don't have to transform it, it's valid as is.
	await server.register(fastifySwagger, {
		openapi: {
			openapi: "3.1.0",
		},
	});

	// Non-core routes
	await server.register(cors, {});
	await server.get("/healthcheck", async function () {
		return { status: "OK" };
	});

	// Core routes
	await server.register(categoryRoutes, { prefix: getPrefix("categories") });
	await server.register(entryRoutes, { prefix: getPrefix("entries") });

	await server.get("/", (request, reply) => {
		reply.send(
			JSON.stringify(
				{ message: "Welcome to the Dragon Age Codex API. See https://dragon-age-codex.onrender.com/docs for documentation." },
				null,
				4
			)
		);
	});
	await server.get("/v1", (request, reply) => {
		reply.send(
			JSON.stringify(
				{ message: "Welcome to the Dragon Age Codex API. See https://dragon-age-codex.onrender.com/docs for documentation." },
				null,
				4
			)
		);
	});

	await server.ready();
	const schema = server.swagger({ yaml: true });
	// const schema = JSON.stringify(app.swagger(), undefined, 2); for pretty print
	await writeFileSync("openapi.yaml", schema);
};
registerRoutes();

export default server;
