"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekStats = exports.getTodayStats = void 0;
var moment_1 = __importDefault(require("moment"));
var task_1 = __importDefault(require("../../models/task"));
function getTodayStats(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var todayStart, todayEnd, tasks, allTimeSpentFromTasks, hoursSpentSum, dayProductivityPercentage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todayStart = new Date();
                    todayStart.setHours(0, 0, 0, 0);
                    todayEnd = new Date();
                    todayEnd.setHours(23, 59, 59, 999);
                    return [4 /*yield*/, task_1.default.aggregate([
                            {
                                $match: {
                                    ownerId: user_id,
                                    updatedAt: { $gte: todayStart, $lte: todayEnd },
                                },
                            },
                        ])];
                case 1:
                    tasks = _a.sent();
                    allTimeSpentFromTasks = tasks.map(function (task) {
                        var timeSpent = task.timeSpent;
                        var hours = new Date(timeSpent).getUTCHours();
                        var minutes = new Date(timeSpent).getUTCMinutes() / 60; //convert to hours
                        var seconds = new Date(timeSpent).getUTCSeconds() / 60 / 60; //convert to hours;
                        var hoursSum = hours + minutes + seconds;
                        return hoursSum;
                    });
                    hoursSpentSum = allTimeSpentFromTasks.reduce(function (prev, curr) { return prev + curr; });
                    dayProductivityPercentage = ((hoursSpentSum / 8) * 100).toFixed(2);
                    return [2 /*return*/, { tasks: tasks, hoursSpentSum: hoursSpentSum, dayProductivityPercentage: dayProductivityPercentage }];
            }
        });
    });
}
exports.getTodayStats = getTodayStats;
function getWeekStats(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, allTimeSpentFromTasks, allTimersWithNameAndId, descTimerArrValue, weekHoursSpentSum, weekProductivityPercentage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, task_1.default.find({
                        ownerId: user_id,
                        updatedAt: {
                            $gte: (0, moment_1.default)().startOf("isoWeek").toDate(),
                            $lte: (0, moment_1.default)().endOf("isoWeek").toDate(),
                        },
                    })];
                case 1:
                    tasks = _a.sent();
                    allTimeSpentFromTasks = tasks.map(function (task) {
                        var timeSpent = task.timeSpent;
                        var hours = new Date(timeSpent).getUTCHours();
                        var minutes = new Date(timeSpent).getUTCMinutes() / 60; //convert to hours
                        var seconds = new Date(timeSpent).getUTCSeconds() / 60 / 60; //convert to hours;
                        var hoursSum = hours + minutes + seconds;
                        return hoursSum;
                    });
                    allTimersWithNameAndId = tasks.map(function (task) {
                        var timeSpent = task.timeSpent;
                        var taskId = task._id;
                        var taskName = task.name;
                        var hours = new Date(timeSpent).getUTCHours();
                        var minutes = new Date(timeSpent).getUTCMinutes() / 60; //convert to hours
                        var seconds = new Date(timeSpent).getUTCSeconds() / 60 / 60; //convert to hours;
                        var hoursSum = hours + minutes + seconds;
                        return { taskId: taskId, taskName: taskName, hoursSum: hoursSum };
                    });
                    descTimerArrValue = allTimersWithNameAndId
                        .sort(function (a, b) { return a.hoursSum - b.hoursSum; })
                        .reverse();
                    weekHoursSpentSum = allTimeSpentFromTasks.reduce(function (prev, curr) { return prev + curr; });
                    weekProductivityPercentage = ((weekHoursSpentSum / 8) * 100).toFixed(2);
                    return [2 /*return*/, { descTimerArrValue: descTimerArrValue, weekHoursSpentSum: weekHoursSpentSum, weekProductivityPercentage: weekProductivityPercentage }];
            }
        });
    });
}
exports.getWeekStats = getWeekStats;
