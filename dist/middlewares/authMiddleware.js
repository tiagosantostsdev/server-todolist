"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.sendStatus(401);
        }
        const parts = authorization.split(" ");
        if (parts.length !== 2) {
            return res.sendStatus(401);
        }
        const [schema, token] = parts;
        if (schema !== "Bearer") {
            return res.sendStatus(401);
        }
        const SECRET_JWT = String(process.env.SECRET_JWT);
        jsonwebtoken_1.default.verify(token, SECRET_JWT, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(400).send({ message: error.message });
            }
            const user = yield (0, userService_1.findUserById)(decoded.id);
            if (!user || !user.id) {
                return res.status(400).send({ message: "Invalid token" });
            }
            req.userId = user.id;
            next();
        }));
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(400).send({ message: error.message });
    }
});
exports.authUser = authUser;
