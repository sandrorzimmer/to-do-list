import mongoose from "mongoose";

const connectionString = "mongodb+srv://bomnegocio3000:Chuve1rr0--@cluster0.mhkkdw6.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString)
    .then(() => console.log("Database connected successfuly."))
    .catch((error) => console.error("Failed to connect to database."))

let db = mongoose.connection;

export default db;