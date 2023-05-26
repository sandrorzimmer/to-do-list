import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        id: { type: String },
        title:
        {
            type: String,
            required: [true, "Title is required."],
            validate: {
                validator: function (title) {
                    return title.trim().length > 0
                },
                message: "Title cannot be blank."
            }
        },
        description: { type: String },
        completed: { type: Boolean, default: false },
        createdAt: {
            type: Date,
            default: new Date()
        },
        dueDate: {
            type: Date,
            required: false,
            validate: {
                validator: function (dueDate) {
                    return dueDate >= new Date();
                },
                message: "Due date must be equal or higher than current date."
            }
        }
    }
);

const tasks = mongoose.model("tasks", taskSchema);

export default tasks;