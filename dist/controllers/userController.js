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
exports.Delete = exports.Update = exports.Find = exports.VerifyEmail = exports.Create = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const loginService_1 = require("../services/loginService");
const emailVerify_1 = require("./config/emailVerify");
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ message: "Please submit all field" });
        }
        const hash = bcrypt_1.default.hashSync(password, 10);
        const user = yield (0, userService_1.createUser)({ username, email, password: hash });
        if (!user) {
            return res.status(400).send({ message: "Error creating new user" });
        }
        const token = (0, loginService_1.generateToken)(user.id);
        (0, emailVerify_1.sendEmail)(user.email, token);
        res.status(201).send({
            message: "User has been created sucessfully, please verify your email",
        });
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(400).send({ message: error.message });
    }
});
exports.Create = Create;
const VerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.token, String(process.env.SECRET_JWT));
        const { id } = decoded;
        const user = yield (0, userService_1.findOneUser)(id);
        user.isVerified = true;
        yield user.save();
        res.status(200).send({ message: "User email verified" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log({ message: error.message });
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.VerifyEmail = VerifyEmail;
const Find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.findUser)();
        if (!user) {
            return res.status(404).send({ message: "No users found" });
        }
        res.status(200).send({ Users: user });
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(500).send({ message: error.message });
    }
});
exports.Find = Find;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.status(400).send({ message: "Username required" });
        }
        const user = yield (0, userService_1.updateUser)({ id, username });
        if (!user) {
            return res.status(400).send({ message: "User can't be updated" });
        }
        res.status(200).send({ message: "Username has been updated" });
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(500).send({ message: error.message });
    }
});
exports.Update = Update;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.deleteUser)(id);
        if (!user) {
            return res.status(400).send({ message: "User can't be deleted" });
        }
        res.status(200).send({ message: "User deleted sucessfully" });
    }
    catch (error) {
        console.error({ message: error.message });
        return res.status(500).send({ message: error.message });
    }
});
exports.Delete = Delete;
