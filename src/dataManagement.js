import ItemGroup from "./item-group";
import ToDoItem from "./todo-item";

function save(serializedMaster) {
    localStorage.setItem("archive",serializedMaster);
}

function load() {
    const archiveToRestore = localStorage.getItem("archive");
    return deserializeMaster(archiveToRestore);
}

function deserializeMaster(serializedMaster) {
    const restoredMasterJSON = JSON.parse(serializedMaster);
    const restoredMaster = new ItemGroup(
        restoredMasterJSON.groupName,
        restoredMasterJSON.id,
        restoredMasterJSON.description);

    for (const group of restoredMasterJSON.contents) {
        const restoredGroupJSON = JSON.parse(group);
        const restoredGroup = new ItemGroup(
            restoredGroupJSON.groupName,
            restoredGroupJSON.id,
            restoredGroupJSON.description);

        for (const item of restoredGroupJSON.contents) {
            const restoredItemJSON = JSON.parse(item);
            const restoredItem = new ToDoItem(
                restoredItemJSON.title,
                restoredItemJSON.description,
                restoredItemJSON.dueDate,
                restoredItemJSON.priorityValue,
                restoredItemJSON.isComplete,
                restoredItemJSON.id)
            restoredGroup.addToGroup(restoredItem);
        }

        restoredMaster.addToGroup(restoredGroup);
        return restoredMaster;
    }
}
export {save,load};