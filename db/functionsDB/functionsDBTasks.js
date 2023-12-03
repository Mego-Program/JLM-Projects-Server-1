import SchmaTasks from "../schma/schmaTasks.js";

export const AddTasks = async(req,res) => {
    const IDproject = req.body.IDproject;
    const columnId = req.body.columnId
    const userName = req.body.userName;
    const content = req.body.content;
    
    
    try{
        const newTasks = await SchmaTasks.create({
        "IDproject":IDproject,
        "columnId":columnId,
        "ResponsibleUsername":userName,
        "content":content,
    })
    res.json(newTasks)
    }catch(error){
        console.log(error);
    }
}

export const DeleteTasks = async(req,res) => {
  const taskeId = req.body.taskeId;
  // const columnId = req.body.columnId
  try{
      const rmTaske = await SchmaTasks.findByIdAndDelete(taskeId);
  if (!rmTaske) {
      throw new Error("משתמש לא קיים");
  }
  console.log(rmTaske);
  res.json(rmTaske)
  }catch(error){
      console.log(error)
  }
  }

export const UpdateTasksStatus = async(req,res) => {
    const taskId = req.body.taskId;
    const newStatus = req.body.newStatus;
    try {
      const updateStatus = await SchmaTasks.findByIdAndUpdate(
        taskId,
        { $set: { tasksStatus: newStatus } },
        { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
      );
  
      if (updateStatus) {
        console.log(`המצב של המשימה ${taskId} עודכן ל-${newStatus} בהצלחה.`);
      } else {
        console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
      }
    } catch (error) {
      console.error('שגיאה במהלך העדכון:', error.message);
    }
}



export const UpdateTaskContent = async(req,res) => {
    const taskId = req.body.taskId;
    const newContent = req.body.newContent;
    try {  
  
      const updateContent = await SchmaTasks.findByIdAndUpdate(
        taskId,
        { $set: { content: newContent } },
        { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
      );
  
      if (updateContent) {
        console.log(`התוכן של המשימה ${taskId} עודכן ל-${newContent} בהצלחה.`);
      } else {
        console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
      }
    } catch (error) {
      console.error('שגיאה במהלך העדכון:', error.message);
    }
}

export const GetTasksByProjectId = async(req,res) => {
  const projectId = req.body.projectId;
  try {
    const tasks = await SchmaTasks.find({ IDproject: projectId });

    if (tasks.length > 0) {
      console.log(`המשימות המשויכות לפרויקט ${projectId}:`);
      console.log(tasks);
      res.json(tasks)
      return tasks; // החזרת התוצאות
      
    } else {
      console.log(`לא נמצאו משימות משויכות לפרויקט עם ID: ${projectId}.`);
      return null; // או כל ערך אחר שתרצה להחזיר במקרה שאין נתונים
    }
    
  } catch (error) {
    console.error('שגיאה במהלך השליפה:', error.message);
  }
}

export const UpdateResponsibleUsername = async(req,res) => {
  const taskId = req.body.taskId;
  const newResponsibleUsername = req.body.newResponsibleUsername;
  try {
  
    const result = await SchmaTasks.findByIdAndUpdate(
      taskId,
      { $set: { "ResponsibleUsername": newResponsibleUsername } },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );

    if (result) {
      console.log(`המשימה ${taskId} עודכנה בהצלחה. ה-ResponsibleUsername עכשיו הוא: ${newResponsibleUsername}`);
    } else {
      console.log(`לא נמצאה משימה עם ID: ${taskId}.`);
    }
  } catch (error) {
    console.error('שגיאה במהלך העדכון:', error.message);
  }
}