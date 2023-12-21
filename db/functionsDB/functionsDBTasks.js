import SchmaTasks from "../schma/schmaTasks.js";

export const AddTasks = async (req, res) => {
  const IDproject = req.body.projectID;
  const columnId = req.body.columnId;
  const header = req.body.header;
  const content = req.body.content;
  const issue = req.body.issue;
  const asignee = req.body.asignee;
  const date = req.body.date;

  try {
    const newTasks = await SchmaTasks.create({
      IDproject: IDproject,
      columnId: columnId,
      header: header,
      content: content,
      issue: issue,
      asignee: asignee,
      date: date,
    });
    res.json(newTasks);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTasks = async (req, res) => {
  const taskeId = req.body.taskeId;
  // const columnId = req.body.columnId
  try {
    const rmTaske = await SchmaTasks.findByIdAndDelete(taskeId);
    if (!rmTaske) {
      throw new Error("משתמש לא קיים");
    }
    console.log(rmTaske);
    res.json(rmTaske);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTasksStatus = async (req, res) => {
  const taskId = req.body.taskId;
  const newColumn = req.body.newColumn;
 
  try {
    const updateStatus = await SchmaTasks.findByIdAndUpdate(
      taskId,
      { $set: { columnId: newColumn } },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );

    if (updateStatus) {
      
      console.log(`המצב של המשימה ${taskId} עודכן ל-${newColumn} בהצלחה.`);
    } else {
      
      console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
    }
    res.json(updateStatus)
  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};

export const UpdateTaskContent = async (req, res) => {
  const taskId = req.body.taskId;
  const header = req.body.header;
  const content = req.body.content;
  const issue = req.body.issue;
  const asignee = req.body.asignee;
  const date = req.body.date;
  try {
    const updateContent = await SchmaTasks.findByIdAndUpdate(
      taskId,
      {
        $set: {
          header: header,
          content: content,
          issue: issue,
          asignee: asignee,
          date: date,
        },
      },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );

    if (updateContent) {
      console.log(`התוכן של המשימה ${taskId} עודכן ל בהצלחה.`);
    } else {
      console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
    }
    res.json(updateContent)
  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};

export const GetTasksByProjectId = async (req, res) => {
  const projectId = req.body.projectId;
  try {
    const tasks = await SchmaTasks.find({ IDproject: projectId });
    res.json(tasks);
    return tasks; // החזרת התוצאות
  } catch (error) {
    console.error("שגיאה במהלך השליפה:", error.message);
  }
};

export const UpdateResponsibleUsername = async (req, res) => {
  const taskId = req.body.taskId;
  const newResponsibleUsername = req.body.newResponsibleUsername;
  try {
    const result = await SchmaTasks.findByIdAndUpdate(
      taskId,
      { $set: { ResponsibleUsername: newResponsibleUsername } },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );

    if (result) {
      console.log(
        `המשימה ${taskId} עודכנה בהצלחה. ה-ResponsibleUsername עכשיו הוא: ${newResponsibleUsername}`
      );
    } else {
      console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
    }
  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};


export const AddTaskToSprints = async (req, res) => {
  const taskId = req.body.taskId; 
  const projectID = req.body.projectID;
  const taskSprintName = req.body.sprintName;

  try {
    const project = await SchemaProject.findById(projectID);
  
    for (let i = 0; i < project.Sprint.length; i++) {
      if (project.Sprint[i].sprintName === taskSprintName) {
        project.Sprint[i].taskArray.push(taskId);
      }
    };
  
  

   const updatedProject = await project.save();

    if (updatedProject) {
      console.log("Task added to all sprints successfully");
      return res.status(200).json({ message: "Task added to all sprints successfully" });
    } else {
      console.log("Failed to add task to sprints");
      return res.status(500).json({ message: "Failed to add task to sprints" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteTaskFromSprint = async (req, res) => {
  const projectId = req.body.projectId;
  const sprintName = req.body.sprintName;
  const taskId = req.body.taskId;

  try {
    const project = await SchemaProject.findById(projectId);

    // Find the sprint in which the task needs to be deleted
    const sprintIndex = project.Sprint.findIndex((sprint) => sprint.sprintName === sprintName);

    if (sprintIndex === -1) {
      console.log('Sprint not found');
      return res.status(404).json({ message: 'Sprint not found' });
    }

    // Find the task index in the taskArray of the sprint
    const taskIndex = project.Sprint[sprintIndex].taskArray.indexOf(taskId);

    if (taskIndex === -1) {
      console.log('Task not found in the sprint');
      return res.status(404).json({ message: 'Task not found in the sprint' });
    }

    // Remove the task from the taskArray of the sprint
    project.Sprint[sprintIndex].taskArray.splice(taskIndex, 1);

    // Save the updated project
    const updatedProject = await project.save();

    if (updatedProject) {
      console.log('Task deleted from the sprint successfully');
      return res.status(200).json({ message: 'Task deleted from the sprint successfully' });
    } else {
      console.log('Failed to delete task from the sprint');
      return res.status(500).json({ message: 'Failed to delete task from the sprint' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};