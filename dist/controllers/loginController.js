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
exports.userLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginService_1 = require("../services/loginService");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "Please submit all field" });
        }
        const user = yield (0, loginService_1.findUserLogin)(email);
        if (!user) {
            return res.status(400).send({ message: "User or password not found" });
        }
        const verifyPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!verifyPassword) {
            return res.status(400).send({ message: "User or password not found" });
        }
        if (user.isVerified === false) {
            return res.status(400).send({ message: "Please verify your user email" });
        }
        const token = (0, loginService_1.generateToken)(user.id);
        res.status(200).send(token);
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(400).send({ message: error.message });
    }
});
exports.userLogin = userLogin;
