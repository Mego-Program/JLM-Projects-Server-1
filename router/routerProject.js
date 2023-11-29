import express from "express";
import {
  AddProject,
  DeleteProject,
  AddMemberToProject,
  RemoveMemberFromProject,
  GetAllData,
  GetProjectByID,
  UpdateProjectColumnUrgency
} from "../db/functionsDB/functionsDBProject.js";

const routerProject = express.Router();

routerProject.post("/add_project",AddProject);
routerProject.post("/delete_project",DeleteProject);
routerProject.post("/add_member_to_project",AddMemberToProject);
routerProject.post("/remove_member_from_project",RemoveMemberFromProject);
routerProject.post("/get_all_data",GetAllData);
routerProject.post("/get_project_by_id",GetProjectByID)
routerProject.post("/update_project_column_urgency",UpdateProjectColumnUrgency)
export default routerProject