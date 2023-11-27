import mongoose from "mongoose";
import data from "../data.js";
import {AddProject,DeleteProject,AddMemberToProject,RemoveMemberFromProject,GetAllData} from "./functionsDB/functionsDBProject.js";
import{AddTasks, UpdateTasksStatus,DeleteTasks, GetTasksByProjectId} from "./functionsDB/functionsDBTasks.js";


const myData = data

const coonected = async () => {

    try{
        await mongoose.connect("mongodb+srv://project:project1234@cluster0.og16tr7.mongodb.net/")
        console.log("connect")
    }
    catch(err){
        console.log(err);
    }

// AddProject("Elazar","zilber")
// DeleteProject("655f5d378505458f27c73d87")
// AddMemberToProject("655f5d328c80db2652c2057c","shalom")
// RemoveMemberFromProject("655f5d328c80db2652c2057c","s")
// GetAllData()

// AddTasks("moshe brizel","sdfghjhgfd","655f598999a30dda03d17e74")
// UpdateTasksStatus("655f8ca762a7e45bad0bc412","doing")
// GetTasksByProjectId("655f598999a30dda03d17e74")

}

export default coonected
