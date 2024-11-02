// Used in controllers to return 400 and validation error
function handleValidationError(request, reply) {
    if (request.validationError) {
        console.error("Validation error for ", request.url);
        return reply.code(400).send(request.validationError);
    }
}
export { handleValidationError };
//# sourceMappingURL=validate.js.map