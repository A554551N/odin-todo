export default class ItemGroup {
    constructor(name,description) {
        this._id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.contents = new Array();
    }

    get id() {
        return this._id;
    }

    addToGroup(toDoItem) {
        this.contents.push(toDoItem);
    }

    deleteFromGroup(toDoItemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === toDoItemID) {
                this.contents.splice(i,1);
                return true;
            }
            return false;
        }
    }

    getFromGroup(toDoItemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === toDoItemID) {
                return this.contents[i];
            }
        }
    }

    updateGroup(toDoItem) {
        this.deleteFromGroup(toDoItem.id);
        this.addToGroup(toDoItem);
    }
}