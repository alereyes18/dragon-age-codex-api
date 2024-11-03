import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";


export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						
						base: "api",
						label: "Dragon Age Codex API",
						schema: "../spec.yaml",
					},
				]),
			],
			sidebar: [
				// Add the generated sidebar group to the sidebar.
				...openAPISidebarGroups,
			],
			title: "Dragin Age Codex API Documentation",
		}),
	],
});
