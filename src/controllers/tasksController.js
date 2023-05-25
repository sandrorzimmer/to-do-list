import tasks from "../models/Task.js";

class TaskController {
    static showTasks = async (req, res) => {
        try {
            const tasksResult = await tasks.find({});
            res.status(200).json(tasksResult);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - Server error` });
        }
    }

    static showTaskById = async (req, res) => {
        try {
            const taskId = req.params.id;

            const taskResult = await tasks.findById({ _id: taskId });
            if (taskResult) {
                res.status(200).json(taskResult);
            } else {
                res.status(400).json({ message: `Task Id ${taskId} not found.` })
            }
        } catch (err) {
            res.status(500).json({ message: `${err.message} - There was an error while looking for task.` });
        }
    }

    static addTask = async (req, res) => {
        try {
            const task = new tasks(req.body);

            const taskResult = await task.save();
            res.status(201).json(taskResult);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - Failed to add task.` })
        }
    }

    static updateTask = async (req, res) => {
        try {
            const taskId = req.params.id;
            const updatedTask = req.body;

            const taskResult = await tasks.findByIdAndUpdate({ _id: taskId }, updatedTask, { new: true });
            if (taskResult) {
                res.status(200).json(taskResult);
            } else {
                res.status(404).json({ message: `Task Id ${taskId} not found.` })
            }
        } catch (err) {
            res.status(500).json({ message: `${err.message} - There was an error while trying to update task.` })
        }
    }

    static deleteTask = async (req, res) => {
        try {
            const taskId = req.params.id;

            await tasks.findOneAndDelete({ _id: taskId })

            res.status(200).json({ message: `Task Id ${taskId} deleted successfuly.` })
        } catch (err) {
            res.status(500).json({ message: `${err.message} - There was an error while trying to delete task.` });
        }
    }
}

export default TaskController;