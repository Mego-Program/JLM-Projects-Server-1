import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  "projectsProductionDate": {
    "type": Date,
    "default": () => Date.now()
  },
  "projectManager": {
    "type": String,
    "required": true
  },
  "projectName": {
    "type": String,
    "required": true
  },
  "projectMembers": {
    "type": Array,
    "default": []
    
  }
});

const SchemaProject = mongoose.model("projects", projectSchema);
export default SchemaProject;
