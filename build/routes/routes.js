"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SessionsController_1 = __importDefault(require("../controllers/SessionsController"));
var TasksController_1 = __importDefault(require("../controllers/TasksController"));
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var routes = (0, express_1.Router)();
/* public routes */
routes.post("/users", UsersController_1.default.create);
routes.put("/sessions", SessionsController_1.default.create);
routes.use(auth_1.default);
/* private routes */
/* Users routes */
routes.get("/users", UsersController_1.default.index);
routes.get("/users/:id", UsersController_1.default.show);
routes.put("/users/:id", UsersController_1.default.update);
routes.delete("/users/:id", UsersController_1.default.destroy);
/* Task Routes */
routes.get("/users/:user_id/tasks", TasksController_1.default.index);
routes.get("/users/:user_id/tasks/today", TasksController_1.default.getStatistics);
routes.get("/users/:user_id/tasks/:id", TasksController_1.default.show);
routes.post("/users/:user_id/tasks", TasksController_1.default.create);
routes.put("/users/:user_id/tasks/:id", TasksController_1.default.update);
routes.delete("/users/:user_id/tasks/:id", TasksController_1.default.destroy);
exports.default = routes;
