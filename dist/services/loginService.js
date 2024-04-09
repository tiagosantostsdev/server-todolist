"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.findUserLogin = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findUserLogin = (email) => userModel_1.User.findOne({ email: email }).select("+password");
exports.findUserLogin = findUserLogin;
const generateToken = (id) => {
    const SECRET_JWT = String(process.env.SECRET_JWT);
    return jsonwebtoken_1.default.sign({ id }, SECRET_JWT, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
