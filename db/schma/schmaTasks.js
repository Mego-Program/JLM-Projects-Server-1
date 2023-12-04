import mongoose from "mongoose";

const tasksSchma = new mongoose.Schema({
    // "ProductionDate": {
    //   "type": Date,
    //   "default": () => Date.now()
    // },
    "IDproject": {
      "type": String
    },
    "columnId": {
      "type": String,
      "default": "todo" 
    },
    "header":{
      "type":String
    },
    "asignee": {
      "type": String
    },
    "issue":{
      "type":String
    },
    "content": {
      "type": String
    },
    "date":{
      "type":Date
    },
    "profilImage":{
      "type":String
    }
  })

  const SchmaTasks = mongoose.model("schms", tasksSchma);
  export default SchmaTasks;