import ItemGroup from "./item-group";
import ToDoItem from "./todo-item";

export default class DataHandler {
    constructor() {
        // needs to run load if a master already exists
        this.master = new ItemGroup("master");
        if (this.master.contents.length===0){
            this.master.addToGroup(new ItemGroup("Default"));
        }

        this._activeGroup = this.master.contents[0]
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

    get activeGroupContents() {
        return this._activeGroup.contents;z
    }
    get allGroups() {
        return this.master.contents;
    }

    createNewItem(title,dueDate,description="",priority=1) {
        const newItem = new ToDoItem(
            title,
            description,
            new Date(dueDate),
            priority);
        this._activeGroup.addToGroup(newItem);
        console.log(`Added Item: ${newItem.title}`);
        return newItem.id;
    }
    updateExistingItem(id,title,dueDate,description,priority) {
        const objToEdit = this.getItemFromID(id);
        objToEdit.title = title;
        objToEdit.dueDate = new Date(dueDate);
        objToEdit.description = description;
        objToEdit.priorityValue=priority;
    }

    createNewGroup(groupName,description=""){
        const newGroup = new ItemGroup(groupName,description);
        this.master.addToGroup(newGroup);
        return newGroup.id;
    }

    toggleComplete(itemID) {
        for(const item of this.activeGroupContents){
            if(item.id === itemID) {
                item.isComplete = !item.isComplete;
                return true;
            }
        }
    }

    set activeGroup(groupID) {
        for(const group of this.master.contents){
            if(group.id === groupID) {
                this._activeGroup = group;
                return true;
            }
        }
    }

    get activeGroup() {
        return this._activeGroup;
    }

    get itemPriorityLevels() {
        const templateItem = new ToDoItem();
        return templateItem.priorityLevels
    }

    getItemFromID(cardID){
        for(const item of this._activeGroup.contents) {
            if (item.id === cardID) {
                return item;
            }
        }
    }
}