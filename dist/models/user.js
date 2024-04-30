"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoiSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.default.Schema({
    nom: String,
    prenom: String,
    age: Number,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now } // Ajout du champ created_at avec une valeur par défaut
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.userJoiSchema = joi_1.default.object({
    nom: joi_1.default.string().required(),
    prenom: joi_1.default.string().required(),
    age: joi_1.default.number().integer().min(0),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    created_at: joi_1.default.date().default(new Date()) // Ajout du champ created_at avec une valeur par défaut
});
//# sourceMappingURL=user.js.map