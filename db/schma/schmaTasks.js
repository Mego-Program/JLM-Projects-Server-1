import mongoose from "mongoose";

const tasksSchma = new mongoose.Schema({
    "ProductionDate": {
      "type": Date,
      "default": () => Date.now()
    },
    "tasksStatusColumn": {
      "type": String,
      "default": "todo" 
    },
    "IDproject": {
      "type": String
    },
    "ResponsibleUsername": {
      "type": String,
      
    },
    "content": {
      "type": String
    },
    "profilImage":{
      "type":String
    }
  })

  const SchmaTasks = mongoose.model("schms", tasksSchma);
  export default SchmaTasks;