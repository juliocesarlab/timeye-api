"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var config = {
    url: process.env.MONGO_DB_CONN_STRING,
};
exports.default = config;
