import type { FastifyRequest } from "fastify";
import { paths } from "./schema";
type GetCategoriesRequest = FastifyRequest & paths["/categories"]["get"];

type GetCategoryRequest = FastifyRequest & paths["/categories"] 
