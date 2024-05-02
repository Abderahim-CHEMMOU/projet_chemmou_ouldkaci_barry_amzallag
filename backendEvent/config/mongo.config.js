"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Fonction permettant de faire la configuration à la connection avec MongoDB
 */
const setMongoConnection = () => {
    mongoose_1.default
        .connect("mongodb://localhost:27017/application" // Assurez-vous de remplacer par le nom de votre base de données
    )
        .then(() => {
        console.log("Connexion à la base de données réussie");
    })
        .catch((error) => {
        console.error("Erreur de connexion à la base de données:", error);
    });
};
exports.setMongoConnection = setMongoConnection;
//# sourceMappingURL=mongo.config.js.map