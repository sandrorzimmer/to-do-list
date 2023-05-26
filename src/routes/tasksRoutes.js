import express from "express";
import TaskController from "../controllers/tasksController.js";
import paginate from "../middlewares/paginator.js";

const router = express.Router();

router
    .get("/tasks", TaskController.showTasks, paginate)
    .get("/tasks/search", TaskController.showTasksByFilter, paginate)
    .get("/tasks/:id", TaskController.showTaskById)
    .post("/tasks", TaskController.addTask)
    .put("/tasks/:id", TaskController.updateTask)
    .delete("/tasks/:id", TaskController.deleteTask)

export default router;