"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var database_1 = __importDefault(require("../../configs/database"));
var Database = /** @class */ (function () {
    function Database() {
        (this.connection = mongoose_1.default.connect(database_1.default.url)),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
    }
    return Database;
}());
exports.default = new Database();
