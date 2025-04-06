export default class DOMManager {
    
    createCard(title,dueDate,description,priorityValue,priority,isComplete) {
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
                priorityText.classList.add("high-priority");
            } else if (priorityValue === 3) {
                priorityText.classList.add("critical");
            }
            cardHeader.appendChild(priorityText);

            const dueDateText = document.createElement("div");
            dueDateText.textContent = dueDate;
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
            cardControls.appendChild(completeButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            cardControls.appendChild(editButton);

            if(isComplete) {
                newCard.classList.add("complete");
            }

            return newCard;
    }

    updateMainContent(todos) {
        const cardContainer = document.querySelector(".content-container");
        for(const todo of todos) {
            cardContainer.appendChild(
                this.createCard(todo.title,
                                todo.dueDate.toDateString(),
                                todo.description,
                                todo.priorityValue,
                                todo.priority,
                                todo.isComplete));
        }
    }

    updateSidebar(groups) {
        const sidebar = document.querySelector("#project-list");
        for (const group of groups) {
            console.log(group.id);
            const listItem = document.createElement("li");
            listItem.textContent = group.groupName;
            sidebar.appendChild(listItem);
        }
    }
}