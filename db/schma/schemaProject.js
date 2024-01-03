import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  columns: {
    type: Array,
    default: [
      { id: "todo", column: "Todo", ColumnUrgency: "🔘" },
      { id: "doing", column: "Work in progress", ColumnUrgency: "🔘" },
      { id: "done", column: "Done", ColumnUrgency: "🔘" },
    ],
  },
});

const SchemaProject = mongoose.model("projects", projectSchema);
export default SchemaProject;
