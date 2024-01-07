import mongoose from "mongoose";

const tasksSchma = new mongoose.Schema({

    "IDproject": {
      "type": String
    },
    "columnId": {
      "type": String,
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

  const SchmaTasks = mongoose.model("schms1", tasksSchma);
  export default SchmaTasks;