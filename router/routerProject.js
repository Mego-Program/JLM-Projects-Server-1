import express from "express";
import {
  AddProject,
  DeleteProject,
  AddMemberToProject,
  RemoveMemberFromProject,
  GetAllBoards,
  getBoardById,
  updateColumnColor,
  updateColumnName,
  AddNewColumn,
  DeleteColumn,
  AddSprints,
  DeleteSprint,
} from "../db/functionsDB/functionsDBProject.js";

const routerProject = express.Router();

routerProject.post("/add_project",AddProject);
routerProject.post("/add_member_to_project",AddMemberToProject);
routerProject.post("/remove_member_from_project",RemoveMemberFromProject);
routerProject.get("/",GetAllData);
routerProject.post("/get_project_by_id",GetProjectByID);
routerProject.post("/update_project_column_urgency",UpdateProjectColumnUrgency);
routerProject.post("/update_project_column_text",UpdateProjectColumnText);
routerProject.post("/add_new_column",AddNewColumn);
routerProject.post("/delete_column",DeleteColumn);
routerProject.post("/add_sprint",AddSprints);
routerProject.post("/delete_sprint",DeleteSprint);

export default routerProject
