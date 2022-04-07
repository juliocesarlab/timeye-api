"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
require("./services/database/index");
var App = /** @class */ (function () {
    function App() {
        this.PORT = process.env.PORT;
        this.server = (0, express_1.default)();
        this.server.listen(this.PORT || 5000);
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)());
    };
    App.prototype.routes = function () {
        this.server.use(routes_1.default);
    };
    return App;
}());
exports.default = new App().server;
