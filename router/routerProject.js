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
  updateBoard,
  getUsers,
  AddSprints,
  DeleteSprint,
  EditSprint,
  GetAllSprints,
} from "../db/functionsDB/functionsDBProject.js";

const routerProject = express.Router();

routerProject.post("/add_project", AddProject);
routerProject.post("/add_member_to_project", AddMemberToProject);
routerProject.post("/remove_member_from_project", RemoveMemberFromProject);
routerProject.post("/get_all_data", GetAllBoards);
routerProject.post("/get_project_by_id", getBoardById);
routerProject.post("/update_project_column_urgency", updateColumnColor);
routerProject.post("/update_project_column_text", updateColumnName);
routerProject.post("/add_new_column", AddNewColumn);
routerProject.post("/delete_column", DeleteColumn);
routerProject.post("/update_board",updateBoard)
routerProject.post("/get_users",getUsers)
routerProject.delete('/',DeleteProject)

export default routerProject



