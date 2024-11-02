import AjvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import Ajv from "ajv";
const ajv = new Ajv({
    removeAdditional: false,
    coerceTypes: "array",
    allErrors: true,
});
AjvErrors(ajv);
ajvKeywords(ajv, "transform");
export { ajv };
//# sourceMappingURL=ajv.js.map