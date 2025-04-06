import ItemGroup from "./item-group";
import ToDoItem from "./todo-item";

export default class DataHandler {
    constructor() {
        this.master = new ItemGroup("master");
        if (this.master.contents.length>0){
            this.activeGroup = this.master.contents[0];
        } else {
            this.activeGroup = new ItemGroup("Default");
        }
    }
    save() {
        localStorage.setItem("archive",this.master);
    }

    load() {
        const archiveToRestore = localStorage.getItem("archive");
        this.master = deserializeMaster(archiveToRestore);
    }

    deserializeMaster(serializedMaster) {
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
}