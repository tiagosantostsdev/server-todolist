import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
    {
        task: {type:String, required:true},
        completed: {type:Boolean, default: false},
        created_date: {type:Date, default: Date.now},
        User:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }
)

export const Task = mongoose.model("tasks", taskSchema);