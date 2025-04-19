export default class DOMManager {
    constructor(dataManager) {
        this.data = dataManager;
        this.initPage();
    }
    
    createCard(title,dueDate,description,priorityValue,priority,isComplete,itemID) {
        const newCard = document.createElement("div");
            newCard.classList.add("todo-card");
            const cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header");
            newCard.appendChild(cardHeader);

            const headerText = document.createElement("h2");
            headerText.classList.add("card-header-text");
            headerText.textContent = title;
            cardHeader.appendChild(headerText);

            const priorityText = document.createElement("div");
            priorityText.classList.add("priority");
            priorityText.textContent = priority;
            if (priorityValue === 2) {
                priorityText.classList.add("High");
            } else if (priorityValue === 3) {
                priorityText.classList.add("Critical");
            }
            cardHeader.appendChild(priorityText);

            const dueDateText = document.createElement("div");
            dueDateText.textContent = `Due: ${dueDate}`;
            dueDateText.classList.add("due-date");
            cardHeader.appendChild(dueDateText);

            const descriptionText = document.createElement("p");
            descriptionText.classList.add("card-description");
            descriptionText.textContent = description;
            newCard.appendChild(descriptionText);

            const cardControls = document.createElement("div");
            cardControls.classList.add("card-controls");
            newCard.appendChild(cardControls);

            const completeButton = document.createElement("button");
            completeButton.textContent = "Mark Complete";
            completeButton.dataset.id = itemID;
            completeButton.addEventListener("click",(e)=>{
                const cardToTarget = e.target.dataset.id;
                this.data.toggleComplete(cardToTarget);
                this.updateMainContent();
            })
            cardControls.appendChild(completeButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.dataset.id = itemID;
            cardControls.appendChild(editButton);

            if(isComplete) {
                newCard.classList.add("complete");
            }

            return newCard;
    }

    initPage() {
        console.log("Page Loaded")
        document.querySelector("#new-item-button").addEventListener("click",(e) => {
            this.toggleHideModal();
            this.updatePriorityElement(1);
        })

        const prioritySelector = document.querySelector("#priority-selector");
            prioritySelector.addEventListener("click", () => {

                const priorityLevelsObj = this.data.itemPriorityLevels;
                const priorityLevelsInt = Object.keys(priorityLevelsObj).map(
                    (pval) => {
                        return Number(pval);
                    }
                )
                const highestPriority = Math.max(...priorityLevelsInt);
                if (Number(prioritySelector.dataset["prival"]) === highestPriority){
                    this.updatePriorityElement(1);
                } else {
                    this.updatePriorityElement(Number(prioritySelector.dataset["prival"]) + 1); 
                }
            })

        const addItemButton = document.querySelector("#add-item-button");
        addItemButton.addEventListener("click",(e)=>{
            console.log("The code of Add Item Button is running")
        const newTitleInput = document.querySelector("#titleInput");
        const newItemTitle = newTitleInput.value;
        newTitleInput.value = "";
        const newDueInput = document.querySelector("#dateInput");
        const newItemDue = newDueInput.value;
        newDueInput.value = "";
        const newPriorityInput = document.querySelector("#priority-selector");
        const newItemPriority = Number(newPriorityInput.dataset["prival"]);
        newPriorityInput.dataset["prival"] = 1;
        const newDescriptionInput = document.querySelector("#descriptionInput");
        const newItemDescription = newDescriptionInput.value;
        newDescriptionInput.value = "";
        this.data.createNewItem(newItemTitle,newItemDue,newItemDescription,newItemPriority);
        this.updateMainContent();
        this.toggleHideModal();
        })
    }

    updateMainContent() {
        const cardContainer = document.querySelector(".content-container");
        cardContainer.replaceChildren();
        for(const todo of this.data.activeGroupContents) {
            cardContainer.appendChild(
                this.createCard(todo.title,
                                todo.dueDate.toDateString(),
                                todo.description,
                                todo.priorityValue,
                                todo.priority,
                                todo.isComplete,
                                todo.id));
        }
    }

    toggleHideModal() {
        const modalComponents = document.querySelectorAll(".modal");
        for (const component of modalComponents) {
            component.classList.toggle("hidden");
        }
    }

    updateSidebar() {
        const sidebar = document.querySelector("#project-list");
        sidebar.replaceChildren();
        for (const group of this.data.allGroups) {
            const listItem = document.createElement("li");
            listItem.textContent = group.groupName;
            listItem.dataset.id = group.id;
            listItem.classList.add("group-li");
            if(listItem.dataset.id === this.data.activeGroup.id) {
                listItem.classList.add("active-group");
            }
            listItem.addEventListener("click",(e) => {
                const newActiveGroupID = e.target.dataset.id;
                this.data.activeGroup = newActiveGroupID;
                this.updateMainContent();
                this.clearActiveSidebar();
                listItem.classList.add("active-group");

            })
            sidebar.appendChild(listItem);
        }
    }

    updatePriorityElement(prival) {
        const priorityLevels = {
            1: "Normal",
            2: "High",
            3: "Critical"
        }

        const prioritySelector = document.querySelector("#priority-selector");
        prioritySelector.dataset["prival"] = prival
        prioritySelector.textContent = priorityLevels[prioritySelector.dataset["prival"]];
                prioritySelector.setAttribute('class', '')
                prioritySelector.classList.add(
                    priorityLevels[Number(prioritySelector.dataset["prival"])]
                )
    }

    clearActiveSidebar() {
        const allSidebarItems = document.querySelectorAll(".group-li");
        for (const sidebarItem of allSidebarItems) {
            sidebarItem.classList.remove("active-group");
        }
    }
}