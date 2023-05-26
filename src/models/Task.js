import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        id: { type: String },
        title:
        {
            type: String,
            required: [true, "Title is required."]
        },
        description: { type: String },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        dueDate: { type: Date }
    }
);

const tasks = mongoose.model("tasks", taskSchema);

export default tasks;