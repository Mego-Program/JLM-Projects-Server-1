import SchemaProject from "../schma/schemaProject.js";
import SchmaTasks from "../schma/schmaTasks.js";
import axios from "axios";

export const AddProject = async (req, res) => {
  const manager = req.body.manager;
  const name = req.body.name;
  const users = req.body.users
  try {
    const newProject = await SchemaProject.create({
      projectName: name,
      projectManager: manager,
      projectMembers: users,

    });
    await newProject.save()
    res.json(newProject);
  } catch (error) {
    console.log(error);
    res.error("a");
  }
};



export const DeleteProject = async (req, res) => {
const {boardId}= req.body

  try {
    const rmProject = await SchemaProject.findOne({_id:boardId._id});

        try{
    const del = await rmProject.deleteOne()}catch(e){console.log('err delete:',e);}
    rmProject.columns = rmProject.columns.filter((col) => col.id !== boardId);
    res.status(200).send('deleted')
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

export const GetAllBoards = async (req, res) => {
  try {
    const allData = await SchemaProject.find();
    res.json(allData);
  } catch (error) {
    console.error("שגיאה במהלך השליפה:", error.message);
    return res.status(400).json({ message: "Error finding boards" });
  }
};

export const getBoardById = async (req, res) => {
  console.log("req.body::", req.body);
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

export const updateColumnColor = async (req, res) => {
  const projectID = req.body.projectId;
  const columnID = req.body.columnID;
  const newColumnUrgency = req.body.newColumnUrgency;

  console.log("newColumnUrgency::", newColumnUrgency);

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

export const updateColumnName = async (req, res) => {
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
    res.json(updatedProject);
  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};

// export const addColumnToProject = async (projectId, newColumn) => {
//   try {
//     // מצא את ה-project לפי ה-ID
//     const project = await SchemaProject.findById(projectId);

//     if (!project) {
//       throw new Error("Project not found");
//     }

//     // הוסף את ה-column החדש למערך ה-columns
//     project.columns.push(newColumn);

//     // שמור את ה-project עם ה-column החדש
//     await project.save();

//     console.log(`Column added successfully to project with ID: ${projectId}`);
//   } catch (error) {
//     console.error(`Error adding column to project: ${error.message}`);
//   }
// };

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
    res.json(AddColumn.columns);

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

    const tasksToDelete = await SchmaTasks.find({ columnId });
    await SchmaTasks.deleteMany({
      _id: { $in: tasksToDelete.map((t) => t._id) },
    });

    rmProject.columns = rmProject.columns.filter((col) => col.id !== columnId);
    await rmProject.save();
    res.json(rmProject);
  } catch (error) {
    console.log(error);
  }
};

export const updateBoard = async (req, res) => {
  const projectId = req.body.projectId;
  const projectManager = req.body.projectManager;
  const projectName = req.body.projectName;
  const projectMembers = req.body.projectMembers
  try {
    const updatedProject = await SchemaProject.findOneAndUpdate(
      { _id: projectId,},
      { $set: { projectName: projectName ,
    projectMembers:projectMembers,
  projectManager:projectManager} },
      { new: true }
    );

    if (updatedProject) {
      console.log(
        `המצב של המשימה ${projectId} עודכן ל-${projectName} בהצלחה.`
      );
    } else {
      console.log(`לא נמצאה משימה עם ID: ${projectId}.`);
    }
    res.json(updatedProject);

  } catch (error) {
    console.error("שגיאה במהלך העדכון:", error.message);
  }
};


export const getUsers = async (req, res) => {
  try {
    const response = await axios.post(
      "https://infra-jerusalem-1-server-five.vercel.app/users/allusers"
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
}
