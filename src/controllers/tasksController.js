import tasks from "../models/Task.js";

class TaskController {
    static showTasks = (req, res) => {
        tasks.find({})
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => {
                res.status(404).json({ message: `${err.message} - Tasks not found.` });
            })
    }

    static showTaskById = (req, res) => {
        const taskId = req.params.id;

        tasks.findById({ _id: taskId })
            .then((task) => {
                if (task) {
                    res.status(200).json(task);
                } else {
                    res.status(404).json({ message: `Task Id ${taskId} not found.` })
                }
            })
            .catch(err => {
                res.status(500).json({ message: `${err.message} - There was an error while looking for task.` });
            })
    }

    static addTask = (req, res) => {
        const task = new tasks(req.body);

        task.save()
            .then(() => {
                res.status(201).json(task)
            })
            .catch((err) => {
                res.status(500).json({ message: `${err.message} - Failed to add task.` })
            })
    }

    static updateTask = (req, res) => {
        const taskId = req.params.id;
        const updatedTask = req.body;

        tasks.findByIdAndUpdate({ _id: taskId }, updatedTask, { new: true })
            .then((task) => {
                if (task) {
                    res.status(200).json(task);
                } else {
                    res.status(404).json({ message: `Task Id ${taskId} not found.` })
                }
            })
            .catch(err => {
                res.status(500).json({ message: `${err.message} - There was an error while trying to update task.` })
            })
    }

    static deleteTask = (req, res) => {
        const taskId = req.params.id;

        tasks.findOneAndDelete({ _id: taskId })
            .then((task) => {
                if (!task) {
                    res.status(404).json({ message: `Task Id ${taskId} not found.` })
                } else {
                    res.status(200).json({ message: `Task Id ${taskId} deleted successfuly.` })
                }
            })
            .catch(err => {
                res.status(500).json({ message: `${err.message} - There was an error while trying to delete task.` })
            })
    }
}

export default TaskController;