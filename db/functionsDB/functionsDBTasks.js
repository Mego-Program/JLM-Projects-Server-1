import SchmaTasks from "../schma/schmaTasks.js";

export async function AddTasks(userName,content,IDproject){
    try{
        const newTasks = await SchmaTasks.create({
        "IDproject":IDproject,
        "ResponsibleUsername":userName,
        "content":content,
    })
    }catch(error){
        console.log(error);
    }
}

export async function DeleteTasks(taskeId) {
  try{
      const rmTaske = await SchmaTasks.findByIdAndDelete(taskeId);
  if (!rmTaske) {
      throw new Error("משתמש לא קיים");
  }
  }catch(error){
      console.log(error)
  }
  }

export async function UpdateTasksStatus(taskId, newStatus) {
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

export async function UpdateTaskContent(taskId, newContent) {
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

export async function GetTasksByProjectId(projectId) {
  try {
    const tasks = await SchmaTasks.find({ IDproject: projectId });

    if (tasks.length > 0) {
      console.log(`המשימות המשויכות לפרויקט ${projectId}:`);
      console.log(tasks);
      return tasks; // החזרת התוצאות
    } else {
      console.log(`לא נמצאו משימות משויכות לפרויקט עם ID: ${projectId}.`);
      return null; // או כל ערך אחר שתרצה להחזיר במקרה שאין נתונים
    }
  } catch (error) {
    console.error('שגיאה במהלך השליפה:', error.message);
  }
}

export async function UpdateResponsibleUsername(taskId, newResponsibleUsername) {
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