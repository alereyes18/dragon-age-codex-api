import server from "./server";
const host = process.env.HOST!;
const port = process.env.PORT
try {
	server.listen({ host, port });
	console.log(`Server listening on ${host}`);
} catch (e) {
	console.error(e);
	process.exit(1);
}
