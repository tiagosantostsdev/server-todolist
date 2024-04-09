"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    const Db_URI = String(process.env.MONGODB_URI || "");
    try {
        mongoose_1.default.connect(Db_URI);
        console.log({ message: "mongodb connected" });
    }
    catch (error) {
        console.log({ message: error });
    }
};
exports.dbConnection = dbConnection;
