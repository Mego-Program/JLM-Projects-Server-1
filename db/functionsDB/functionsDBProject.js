import SchemaProject from "../schma/schemaProject.js";
import mongoose from 'mongoose';

export const AddProject = async (req, res) => {
  const manager = req.body.manager;
  const name = req.body.name;
  try {
    const newProject = await SchemaProject.create({
      projectName: name,
      projectManager: manager,
    });
    res.json(newProject)

  } catch (error) {
    console.log(error);
    res.error("a")
  }
};

export const DeleteProject = async (req, res) => {
  const projectId = req.body.projectId;
  const columnId = req.body.columnId;

  try {
    const rmProject = await SchemaProject.findById(projectId);
    if (!rmProject) {
      throw new Error("משתמש לא קיים");
    }
    rmProject.columns = rmProject.columns.filter((col) => col.id !== columnId);
    await rmProject.save();
  } catch (error) {
    console.log(error);
  }
};

export const AddMemberToProject = async (req, res) => {
  const projectId = req.body.projectId;
  const newMember = req.body.newMember;
  try {
    const updateMember = await SchemaProject.findByIdAndUpdate(
      projectId,
      { $push: { projectMembers: newMember } },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );

    if (updateMember) {
      console.log(`המחרוזת ${newMember} נוספה לפרויקט ${projectId} בהצלחה.`);
    } else {
      console.log(`לא נמצא פרויקט עם ID: ${projectId}.`);
    }
  } catch (error) {
    console.error("שגיאה במהלך ההוספה:", error.message);
  }
};

export const RemoveMemberFromProject = async (req, res) => {
  const projectId = req.body.projectId;
  const memberToRemove = req.body.memberToRemove;
  try {
    const removeMember = await SchemaProject.findByIdAndUpdate(
      projectId,
      { $pull: { projectMembers: memberToRemove } },
      { new: true }
    );
    if (removeMember) {
      console.log(
        `המחרוזת ${memberToRemove} נוספה לפרויקט ${projectId} בהצלחה.`
      );
    } else {
      console.log(`לא נמצא פרויקט עם ID: ${projectId}.`);
    }
  } catch (error) {
    console.error("שגיאה במהלך ההוספה:", error.message);
  }
};

export const GetAllData = async (req, res) => {
    console.log("aaaaaaa");
  try {
    const allData = await SchemaProject.find();

    if (allData.length > 0) {
      console.log("הנתונים מסדרו לך:");
      console.log(allData);
    } else {
      console.log("לא נמצאו נתונים במסד הנתונים.");
    }
    res.json(allData);
    // res.json(allData)
  } catch (error) {
    console.error("שגיאה במהלך השליפה:", error.message);
  }
};

export const GetProjectByID = async (req, res) => {
  console.log("fun");
  try {
    const projectId = req.body.projectId;
    const project = await SchemaProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProjectColumnUrgency = async (req, res) => {
  const projectID = req.body.projectId;
  const columnID = req.body.columnID;
  const newColumnUrgency = req.body.newColumnUrgency;

  console.log(newColumnUrgency);
  try {
    const updatedProject = await SchemaProject.findOneAndUpdate(
      { _id: projectID, "columns.id": columnID },
      { $set: { "columns.$.ColumnUrgency": newColumnUrgency } },
      { new: true }
    );

    if (updatedProject) {
      console.log(
        `המצב של המשימה ${projectID} עודכן ל-${newColumnUrgency} בהצלחה.`
      );
    } else {
      console.log(`לא נמצאה משימה עם ID: ${projectID}.`);
    }
  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};

export const UpdateProjectColumnText = async (req, res) => {
    const projectID = req.body.projectId;
    const columnID = req.body.columnID;
    const newColumntext = req.body.columnText;
    try {
      const updatedProject = await SchemaProject.findOneAndUpdate(
        { _id: projectID, "columns.id": columnID },
        { $set: { "columns.$.column": newColumntext } },
        { new: true }
      );
  
      if (updatedProject) {
        console.log(
          `המצב של המשימה ${projectID} עודכן ל-${newColumntext} בהצלחה.`
        );
      } else {
        console.log(`לא נמצאה משימה עם ID: ${projectID}.`);
      }
      res.json(updatedProject)
    } catch (error) {
      console.error("שגיאה במהלך העדכון:", error.message);
    }
  };

export const addColumnToProject = async (projectId, newColumn) => {
  try {
    // מצא את ה-project לפי ה-ID
    const project = await SchemaProject.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // הוסף את ה-column החדש למערך ה-columns
    project.columns.push(newColumn);

    // שמור את ה-project עם ה-column החדש
    await project.save();

    console.log(`Column added successfully to project with ID: ${projectId}`);
  } catch (error) {
    console.error(`Error adding column to project: ${error.message}`);
  }
};

export const AddNewColumn = async (req, res) => {
  const projectID = req.body.projectId;
  const columnID = req.body.columnID;
  const nameColumn = req.body.nameColumn;
  try {
    const AddColumn = await SchemaProject.findByIdAndUpdate(
        projectID,
      {
        $push: {
          columns: { id: columnID, column: nameColumn, ColumnUrgency: "🔘" },
        },
      },
      { new: true } // הפרמטר הזה מחזיר את המסמך המעודכן
    );
    res.json(AddColumn.columns)

    if (AddColumn) {
      console.log(`המחרוזת ${nameColumn} נוספה לפרויקט ${projectID} בהצלחה.`);
    } else {
      console.log(`לא נמצא פרויקט עם ID: ${projectID}.`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DeleteColumn = async (req, res) => {
  const projectId = req.body.projectId;
  const columnId = req.body.columnId;
  try {
    const rmProject = await SchemaProject.findById(projectId);
    if (!rmProject) {
      throw new Error("משתמש לא קיים");
    }
    rmProject.columns = rmProject.columns.filter((col) => col.id !== columnId);
    await rmProject.save();
    res.json(rmProject)
  } catch (error) {
    console.log(error);
  }
};
