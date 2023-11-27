import SchemaProject from "../schma/schemaProject.js"

export const AddProject =  async (req,res) => {
    
    const manager = req.body.manager;
    const name = req.body.name;
    try{
        
        const newProject = await SchemaProject.create({
        "projectName":name,
        "projectManager":manager
    })
    }catch(error){
        console.log(error);
    }
}


export const DeleteProject = async(req,res) => {
    const projectId = req.body.projectId
    try{
        const rmProject = await SchemaProject.findByIdAndDelete(projectId);
    if (!rmProject) {
        throw new Error("משתמש לא קיים");
    }
    }catch(error){
        console.log(error)
    }
}

export const AddMemberToProject = async(req,res) => {
    const projectId = req.body.projectId
    const newMember = req.body.newMember
    try{
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
        console.error('שגיאה במהלך ההוספה:', error.message);
    }
}

export const RemoveMemberFromProject = async(req,res) => {
    const projectId = req.body.projectId
    const memberToRemove = req.body.memberToRemove
    try{
        const removeMember = await SchemaProject.findByIdAndUpdate(   
        projectId,
        { $pull: { projectMembers: memberToRemove } },
        { new: true }
        );
        if (removeMember) {
            console.log(`המחרוזת ${memberToRemove} נוספה לפרויקט ${projectId} בהצלחה.`);
        } else {
            console.log(`לא נמצא פרויקט עם ID: ${projectId}.`);
        }
    } catch (error) {
        console.error('שגיאה במהלך ההוספה:', error.message);
    }
}

export const GetAllData = async(req,res) => {
    try{
        const allData = await SchemaProject.find();

        if (allData.length > 0) {
          console.log('הנתונים מסדרו לך:');
          console.log(allData);
        } else {
          console.log('לא נמצאו נתונים במסד הנתונים.');
        }
    } catch (error) {
        console.error('שגיאה במהלך השליפה:', error.message);
    }
}

