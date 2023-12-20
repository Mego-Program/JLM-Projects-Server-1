import SchmaTasks from "../schma/schmaTasks.js";

export const AddTasks = async (req, res) => {
  const projectID = req.body.projectID;
  const columnId = req.body.columnId;
  const header = req.body.header;
  const content = req.body.content;
  const issue = req.body.issue;
  const asignee = req.body.asignee;
  const date = req.body.date;

  console.log("req.body::", req.body);
  try {
    const newTasks = await SchmaTasks.create({
      IDproject: projectID,
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
    res.json(updateStatus);
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
    res.json(updateContent);
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
