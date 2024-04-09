import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
    {
        task: {type:String, required:true},
        status: {type:Boolean, default: false},
        created_date: {type:String, required:true},
        User:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }
)

export const Task = mongoose.model("tasks", taskSchema);