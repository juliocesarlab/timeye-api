"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var defaultNowDate = new Date();
defaultNowDate.setHours(defaultNowDate.getHours() - 3);
var taskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    sample: {
        type: Number,
        required: false,
    },
    timeSpent: {
        type: Date,
        required: false,
        default: new Date().setHours(-3, 0, 0, 0),
    },
    productivity: {
        type: Number,
        required: false,
        default: 0,
    },
    ownerId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: false,
});
exports.default = mongoose_1.default.model("Task", taskSchema);
