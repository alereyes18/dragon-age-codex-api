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
					  async: true,
 					  defer: true,

					} ,
				 
					
				  },
				  {
                    tag: 'script',
                    content: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-JKZK265NBN');
                    `,
                },
			],
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						
						base: "docs",
						label: "Dragon Age Codex API",
						schema: "../api/openapi.yaml"
					},
				]),
			],
			sidebar: [
				// Add the generated sidebar group to the sidebar.
				...openAPISidebarGroups,
			],
			title: "Documentation",
		}),
	],
});
