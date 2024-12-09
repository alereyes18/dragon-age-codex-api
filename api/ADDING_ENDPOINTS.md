# Adding Endpoints

  
> When changing endpoints, always make sure to update spec.yaml so the documentation is up to date.

When adding an endpoint, you must define the schema, route, and handler. The schema is a JSON schema that validates the request body. The route is the URL path. The handler is the function that processes the request and sends a response.

- If you want to add a completely new endpoint like `GET /characters`, see [Adding a New Endpoint](#adding-a-new-endpoint).
- If you want to add query parameters to an existing endpoint like `GET /codex?game=da2`, see [Adding Query Parameters](#adding-query-parameters).
- If you want to add URL parameters to an existing endpoint like `GET /codex/:id`, see [Adding URL Parameters](#adding-url-parameters).

### Defining Types

Before adding a new endpoint, you need to define the types for the request body, query parameters, and URL parameters. You should create a new file in the types folder for each new type. You can import them where needed like so:

```typescript
import { CharactersParams } from '@types/characters';
 ```

### [Adding a New Endpoint](#adding-a-new-endpoint)
To add a new route, you need to create a folder under modules with the name of the route. 

Let's say you want to add the route `api/v1/characters`, you would create a folder called `characters` under modules. Inside the `characters` folder, you would create files `characters.controller.ts`, `characters.route.ts`, `characters.schema.ts`, and `characters.service.ts`.

The folder structure should be like:
- modules
    - characters
        - characters.controller.ts
        - characters.route.ts
        - characters.schema.ts
        - characters.service.ts


#### Route.ts
`characters.route.ts` should have all of the server routes for the characters endpoint. You will need to import `FastifyInstance`, the schema, and any type definitions for route parameters, as well as the handler for each route.

```typescript
import { FastifyInstance } from "fastify";
import { getCharactersHandler, getCharacterHandler } from "./characters.controller";
import { schema } from "./category.schema";
import { CharacterParams } from "@/types/characters";

async function charactersRoutes(server: FastifyInstance) {
	server.get("/", getCharactersHandler);
	server.get<{ Params: CharacterParams }>("/:character", schema, getCharacterHandler);
}

export default charactersRoutes;

```

#### Controller.ts
`characters.controller.ts` should have all of the business logic for the characters endpoint. It needs to handle validation errors, and then call the service. Here, you should parse query and URL parameters, and call the service functions.

```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { findCharacters, findCharacter } from "./category.service";
import { CharacterParams } from "@/types/character";
import { handleValidationError } from "@/utils/validate";

// Handle GET /v1/characters 
async function getCharactersHandler(request: FastifyRequest, reply: FastifyReply) {
	if (!handleValidationError(request, reply)) {
		const categories = await findCharacters();
		reply.send(JSON.stringify(categories, null, 4));
	}
}

// Handle GET /v1/categories/:category
async function getCharacterHandler(request: FastifyRequest<{ Params: CharacterParams }>, reply: FastifyReply) {
	if (!handleValidationError(request, reply)) {
		const characterParam = request.params.category;
		const character = await findCharacter(characterParam);
		reply.send(JSON.stringify(character, null, 4));
	}
}

export { getCharactersHandler, getCharacterHandler };

```

#### Service.ts
`characters.service.ts` should have all of the database logic for the characters endpoint. It should have functions that interact with the database and return the data to the controller.


#### Schema.ts
`characters.schema.ts` should have the JSON schema for the request body. This is used to validate the request body before processing it. You can use the `ajv` library to validate the schema.

```typescript
import { RouteShorthandOptions } from "fastify";
const CharacterParamsJsonSchema = {
  errorMessage: {...}, //should have messages for validation errors
  type: ...
  properties: {
    ...
  }
  additionalProperties: false // throw error if there are additional properties
};
export const schema: RouteShorthandOptions = {
  schema: {
    params: CharacterParamsJsonSchema
  }
  attachValidation: true,
};
```

#### Serving the new Endpoint: 
Register the new routes in `server.ts` using
```typescript
await server.register(charactersRoutes, { prefix: getPrefix("characters") });
```
### [Adding Query Parameters](#adding-query-parameters)
If you want to add something like `GET /characters?game=1`, you need to 
- create a new handler for the route in `characters.controller.ts` (remember to handle validation errors)
- create the service functions in `characters.service.ts`
- update the schema to include the new query parameters in `characters.schema.ts`
- add the new route to `characters.route.ts`



### [Adding URL Parameters](#adding-url-parameters)
If you want to add something like `GET /characters/:id`, you need to
- create a new handler for the route in `characters.controller.ts` (remember to handle validation errors)
- create the service functions in `characters.service.ts`
- update the schema to include the new URL parameters in `characters.schema.ts`
- add the new route to `characters.route.ts`
 
 
 