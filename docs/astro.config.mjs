import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";


export default defineConfig({
	integrations: [
		
		starlight({
			head: [
				{
					tag: 'script',
					attrs: {
					  src: 'https://www.googletagmanager.com/gtag/js?id=G-JKZK265NBN',
				  

					} 
					
				  },
			],
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						
						base: "docs",
						label: "Dragon Age Codex API",
						schema: "../spec.yaml",
					},
				]),
			],
			sidebar: [
				// Add the generated sidebar group to the sidebar.
				...openAPISidebarGroups,
			],
			title: "Dragon Age Codex API Documentation",
		}),
	],
});
