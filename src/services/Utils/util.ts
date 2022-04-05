import moment from "moment";
import Task from "../../models/task";

export async function getTodayStats(user_id: string) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    ownerId: user_id,
    updatedAt: { $gte: todayStart, $lte: todayEnd },
  });

  const allTimeSpentFromTasks = tasks.map((task) => {
    const timeSpent = task.timeSpent;
    const hours = new Date(timeSpent).getUTCHours();
    const minutes = new Date(timeSpent).getUTCMinutes() / 60; //convert to hours
    const seconds = new Date(timeSpent).getUTCSeconds() / 60 / 60; //convert to hours;
    const hoursSum = hours + minutes + seconds;
    return hoursSum;
  });

  const hoursSpentSum = allTimeSpentFromTasks.reduce(
    (prev, curr) => prev + curr
  );

  const dayProductivityPercentage = ((hoursSpentSum / 8) * 100).toFixed(2);

  return { tasks, hoursSpentSum, dayProductivityPercentage };
}

export async function getWeekStats(user_id: string) {
  const tasks = await Task.find({
    ownerId: user_id,
    updatedAt: {
      $gte: moment().startOf("isoWeek").toDate(),
      $lte: moment().endOf("isoWeek").toDate(),
    },
  });

  const allTimeSpentFromTasks = tasks.map((task) => {
    const timeSpent = task.timeSpent;
    const hours = new Date(timeSpent).getUTCHours();
    const minutes = new Date(timeSpent).getUTCMinutes() / 60; //convert to hours
    const seconds = new Date(timeSpent).getUTCSeconds() / 60 / 60; //convert to hours;
    const hoursSum = hours + minutes + seconds;
    return hoursSum;
  });

  const weekHoursSpentSum = allTimeSpentFromTasks.reduce(
    (prev, curr) => prev + curr
  );

  const weekProductivityPercentage = ((weekHoursSpentSum / 8) * 100).toFixed(2);

  return { weekHoursSpentSum, weekProductivityPercentage };
}
