import { Request, Response } from "express";
import Task from "../models/task";
import UsersServices from "../services/users/UsersServices";
import { getTodayStats, getWeekStats } from "../services/Utils/util";

class TasksController {
  async index(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = UsersServices.verifyIfExistsById(user_id);

      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const tasks = await Task.find({
        ownerId: user_id,
      });

      return res.status(202).json({ tasks, status: "success" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error", status: "failure" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { user_id, id } = req.params;

      const user = UsersServices.verifyIfExistsById(user_id);
      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const task = await Task.findOne({
        _id: id,
        ownerId: user_id,
      });

      if (!task)
        return res
          .status(404)
          .json({ message: "This task don't exists", status: "failure" });

      return res.status(200).json({ task, status: "success" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error", status: "failure" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, sample } = req.body;
      const { user_id } = req.params;
      const user = UsersServices.verifyIfExistsById(user_id);

      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const task = await Task.findOne({
        userId: user_id,
        name,
      });

      if (task)
        return res.status(401).json({
          message: `task with name ${name} already exists`,
          status: "failure",
        });

      const firstDate = new Date();
      firstDate.setHours(firstDate.getUTCHours() - 3);

      const createdTask = await Task.create({
        name,
        sample,
        ownerId: user_id,
        createdAt: firstDate,
        updatedAt: firstDate,
      });

      return res.status(201).json({ createdTask, status: "success" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error:" + e, status: "failure" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { user_id, id } = req.params;
      const { name, sample, timeSpent, productivity } = req.body;

      const user = UsersServices.verifyIfExistsById(user_id);
      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const task = await Task.findOne({
        _id: id,
        ownerId: user_id,
      });

      if (!task)
        return res
          .status(404)
          .json({ message: "This task don't exists", status: "failure" });

      const updatedAt = new Date();
      updatedAt.setHours(updatedAt.getHours() - 3); // utc format

      await task.updateOne({
        name,
        sample,
        timeSpent,
        productivity,
        updatedAt,
      });

      res.status(200).json({ status: "success" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error", status: "failure" });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { user_id, id } = req.params;
      const user = UsersServices.verifyIfExistsById(user_id);

      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const task = await Task.findById(id);

      if (!task)
        return res
          .status(404)
          .json({ message: "task dont't exists", status: "failure" });

      await Task.deleteOne(task);

      res.status(200).json({ status: "success" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error", status: "failure" });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await UsersServices.verifyIfExistsById(user_id);

      if (!user)
        return res
          .status(404)
          .json({ message: "User not found", status: "failure" });

      const { tasks, hoursSpentSum, dayProductivityPercentage }: any =
        await getTodayStats(user_id);

      const {
        weekHoursSpentSum,
        weekProductivityPercentage,
        descTimerArrValue,
      } = await getWeekStats(user_id);

      const stats = {
        descTimerArrValue,
        hoursSpentSum,
        dayProductivityPercentage,
        weekHoursSpentSum,
        weekProductivityPercentage,
      };

      if (tasks) {
        return res.status(200).json({
          tasks,
          stats,
        });
      }
    } catch (e) {
      return res.status(500).json({ e: JSON.stringify(e) });
    }
  }
}

export default new TasksController();
