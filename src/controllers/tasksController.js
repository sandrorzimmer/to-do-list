import NotFound from "../errors/NotFound.js";
import { tasks } from "../models/index.js";

class TaskController {
    static showTasks = async (req, res, next) => {
        try {
            const searchTasks = tasks.find();

            req.result = searchTasks;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showTaskById = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            const taskResult = await tasks.findById({ _id: taskId });
            if (taskResult) {
                res.status(200).json(taskResult);
            } else {
                next(new NotFound("Task ID not found."));
            }
        } catch (error) {
            next(error);
        }
    }

    static addTask = async (req, res, next) => {
        try {
            const task = new tasks(req.body);

            const taskResult = await task.save();
            res.status(201).json(taskResult);
        } catch (error) {
            next(error);
        }
    }

    static updateTask = async (req, res, next) => {
        try {
            const taskId = req.params.id;
            const updatedTask = req.body;

            const taskResult = await tasks.findByIdAndUpdate({ _id: taskId }, updatedTask, { new: true });
            if (taskResult) {
                res.status(200).json(taskResult);
            } else {
                next(new NotFound("Task ID not found."));
            }
        } catch (error) {
            next(error);
        }
    }

    static deleteTask = async (req, res, next) => {
        try {
            const taskId = req.params.id;
            const taskResult = await tasks.findByIdAndDelete({ _id: taskId });

            if (taskResult !== null) {
                res.status(200).json({ message: `Task Id ${taskId} deleted successfuly.` })
            } else {
                next(new NotFound("Task ID not found."));
            }
        } catch (error) {
            next(error);
        }
    }

    static showTasksByFilter = async (req, res, next) => {
        try {
            const search = searchHandling(req.query);

            if (search !== null) {
                const tasksResult = tasks
                    .find(search);

                req.result = tasksResult;

                next();
            } else {
                res.status(200).send([]);
            }
        } catch (error) {
            next(error);
        }
    }
}

function searchHandling(params) {
    const { title, description, completed, minDueDate, maxDueDate } = params;

    const search = {};

    if (title) search.title = { $regex: title, $options: "i" };
    if (description) search.description = { $regex: description, $options: "i" };

    if (completed) search.completed = completed;

    if (minDueDate || maxDueDate) search.dueDate = {};

    if (minDueDate) search.dueDate.$gte = new Date(minDueDate);
    if (maxDueDate) search.dueDate.$lte = new Date(maxDueDate);

    return search;
}

export default TaskController;