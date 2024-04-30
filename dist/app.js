"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const mongo_config_1 = require("./config/mongo.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8080;
(0, mongo_config_1.setMongoConnection)();
(0, userRoutes_1.setUserRouting)(app);
app.listen(port, () => {
    console.log(`serveur en écoute sur le port : ${port}`);
});
//# sourceMappingURL=app.js.map