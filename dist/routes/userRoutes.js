"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRouting = void 0;
const userController_1 = require("../controller/userController");
/**
 * Fonction permettant d'exporter toute nos routes users vers app.ts
 * @param app
 */
const setUserRouting = (app) => {
    const endpoint = "users";
    app.get(`/${endpoint}`, userController_1.userController.findAll);
    app.get(`/${endpoint}/:id`, userController_1.userController.findById);
    app.post(`/${endpoint}`, userController_1.userController.create);
    app.patch(`/${endpoint}/:id`, userController_1.userController.update);
    app.delete(`/${endpoint}/:id`, userController_1.userController.delete);
};
exports.setUserRouting = setUserRouting;
//# sourceMappingURL=userRoutes.js.map