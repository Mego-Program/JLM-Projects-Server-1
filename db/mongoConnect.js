import mongoose from "mongoose";
import data from "../data.js";
import {
  AddProject,
  DeleteProject,
  AddMemberToProject,
  RemoveMemberFromProject,
  GetAllBoards,
} from "./functionsDB/functionsDBProject.js";
import {
  AddTasks,
  UpdateTasksStatus,
  DeleteTasks,
  GetTasksByProjectId,
} from "./functionsDB/functionsDBTasks.js";

const myData = data;

const coonected = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://project:project1234@cluster0.og16tr7.mongodb.net/"
    );
    console.log("connect");
  } catch (err) {
    console.log(err);
  }
};

export default coonected;
