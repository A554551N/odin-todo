export default class ItemGroup {
    constructor(groupName,description) {
        this._id = crypto.randomUUID();
        this.group = true;
        this.groupName = groupName;
        this.description = description;
        this.contents = new Array();
    }

    get id() {
        return this._id;
    }

    addToGroup(itemToAdd) {
        this.contents.push(itemToAdd);
    }

    deleteFromGroup(itemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === itemID) {
                this.contents.splice(i,1);
                return true;
            }
            return false;
        }
    }

    getFromGroup(itemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === itemID) {
                return this.contents[i];
            }
        }
    }

    updateGroup(itemToUpdate) {
        this.deleteFromGroup(itemToUpdate.id);
        this.addToGroup(itemToUpdate);
    }
}