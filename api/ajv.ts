// https://github.com/fastify/ajv-compiler#ajv-configuration

import AjvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import Ajv from "ajv";

const ajv = new Ajv({
	removeAdditional: false, // keep extra query params, in case some are malformed by user so they get an error and can see correct syntax
	coerceTypes: "array",
	allErrors: true,
});

AjvErrors(ajv);
ajvKeywords(ajv, "transform");

export { ajv };
