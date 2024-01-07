import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  Sprint: {
    type: Array,
    default: [],
  },
  projectsProductionDate: {
    type: Date,
    default: () => Date.now(),
  },
  projectManager: {
    type: Object,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectMembers: {
    type: Array,
    default: [],
  },
  columnIDs: {
    Open: {
      type: String,
      unique: true,
      required: true,
    },
    InProgress: {
      type: String,
      unique: true,
      required: true,
    },
    Resolved: {
      type: String,
      unique: true,
      required: true,
    },
    Closed: {
      type: String,
      unique: true,
      required: true,
    },
  },
});

const SchemaProject = mongoose.model("projects1", projectSchema);
export default SchemaProject;
