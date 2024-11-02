import server from "./server";
const host = process.env.HOST;
try {
    server.listen({ host });
    console.log(`Server listening on ${host}`);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
//# sourceMappingURL=app.js.map