import express from "express";
import {
  AddTasks,
  DeleteTasks,
  UpdateTasksStatus,
  UpdateTaskContent,
  GetTasksByProjectId,
  UpdateResponsibleUsername,
} from "../db/functionsDB/functionsDBTasks.js";
 const routerTasks = express.Router();

 routerTasks.post("/add_tasks",AddTasks)
 routerTasks.post("/delete_tasks",DeleteTasks)
 routerTasks.post("/update_tasks_status",UpdateTasksStatus)
 routerTasks.post("/update_task_content",UpdateTaskContent)
 routerTasks.post("/get_tasks_by_projectId",GetTasksByProjectId)
 routerTasks.post("/update_responsible_username",UpdateResponsibleUsername)

export default routerTasks