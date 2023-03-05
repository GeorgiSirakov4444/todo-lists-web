const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");


class Storage {
    static addTodStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}
let todoArr = Storage.getStorage();


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    let message = input.value;

    if (message === " " || message.length == 0) {
        message = "Alexa's memory"
    }

    const todo = new Todo(id, message);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    
    Storage.addTodStorage(todoArr);
});

class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}

class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
    }
    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }
}

//once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});