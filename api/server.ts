import fastifySwagger from "@fastify/swagger";
("@fastify/swagger");
import qs from "qs";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import categoryRoutes from "./modules/category/category.route";
import getPrefix from "./utils/getPrefix";
import entryRoutes from "./modules/entries/entry.route";

import { ajv } from "./ajv";
// import { writeFileSync } from "fs";
const server = fastify({
	schemaErrorFormatter: (errors, dataVar) => {
		const errorMessage = errors.map(error => "ERROR: " + error.message?.trim()).join(", ");
		return new Error(errorMessage);
	},

	querystringParser: str =>
		qs.parse(str, {
			comma: true,
		}),
});

server.setErrorHandler(function (error, request: FastifyRequest, reply: FastifyReply) {
	if (error.validation) {
		if (error.validation.length > 1) {
			const messages = error.validation.map((err: any) => ({ error: err.message }));
			reply.status(400).type("application/json").send({
				statusCode: 400,
				code: "FST_ERR_VALIDATION",
				error: "Bad Request",
				messages: messages,
			});
		} else {
			reply.status(400).type("application/json").send({
				statusCode: 400,
				code: "FST_ERR_VALIDATION",
				error: "Bad Request",
				message: error.message,
			});
		}
	} else {
		// Handle other types of errors if necessary
		reply.status(500).send({ error: "Internal Server Error" });
	}
});

server.register(fastifySwagger);
server.setValidatorCompiler(opt => ajv.compile(opt.schema));

await server.get("/healthcheck", async function () {
	return { status: "OK" };
});
await server.register(cors, {});
await server.register(categoryRoutes, { prefix: getPrefix("categories") });
await server.register(entryRoutes, { prefix: getPrefix("entries") });
 

await server.ready();

// const yaml = server.swagger({yaml: true});
// writeFileSync("fastify.yaml", yaml);
export default server;
