import server from "./server";
const host = process.env.HOST!;
const port = parseInt(process.env.PORT!, 10);
try {
	server.listen({ host, port });
	console.log(`Server listening on ${host}`);
} catch (e) {
	console.error(e);
	process.exit(1);
}
