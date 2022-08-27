var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var esm_exports = {};
__export(esm_exports, {
  AggregateError: () => import_p_some2.AggregateError,
  default: () => pAny
});
module.exports = __toCommonJS(esm_exports);
var import_p_some = __toESM(require("@esm2cjs/p-some"));
var import_p_cancelable = __toESM(require("@esm2cjs/p-cancelable"));
var import_p_some2 = require("@esm2cjs/p-some");
function pAny(iterable, options) {
  const anyCancelable = (0, import_p_some.default)(iterable, { ...options, count: 1 });
  return import_p_cancelable.default.fn(async (onCancel) => {
    onCancel(() => {
      anyCancelable.cancel();
    });
    const [value] = await anyCancelable;
    return value;
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregateError
});
//# sourceMappingURL=index.js.map
