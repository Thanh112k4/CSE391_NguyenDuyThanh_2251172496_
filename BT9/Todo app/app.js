const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countDisplay = document.querySelector("#count");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

renderTodos();

todoForm.addEventListener("submit", function(e){
    e.preventDefault();

    const text = todoInput.value.trim();

    if(text === "") return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    saveTodos();

    renderTodos();

    todoInput.value = "";
});

todoList.addEventListener("click", function(e){

    const li = e.target.closest("li");

    if(!li) return;

    const id = Number(li.dataset.id);

    if(e.target.classList.contains("delete-btn")){

        todos = todos.filter(todo => todo.id !== id);

        saveTodos();

        renderTodos();
    }

    if(e.target.classList.contains("todo-text")){

        const todo = todos.find(t => t.id === id);

        todo.completed = !todo.completed;

        saveTodos();

        renderTodos();
    }
});

todoList.addEventListener("dblclick", function(e){

    if(!e.target.classList.contains("todo-text")) return;

    const li = e.target.closest("li");

    const id = Number(li.dataset.id);

    const todo = todos.find(t => t.id === id);

    const input = document.createElement("input");

    input.value = todo.text;

    input.className = "edit-input";

    e.target.replaceWith(input);

    input.focus();

    input.addEventListener("keydown", function(event){

        if(event.key === "Enter"){

            const newText = input.value.trim();

            if(newText){

                todo.text = newText;

                saveTodos();

                renderTodos();
            }
        }
    });
});

clearCompletedBtn.addEventListener("click", function(){

    todos = todos.filter(todo => !todo.completed);

    saveTodos();

    renderTodos();
});

filterButtons.forEach(btn => {

    btn.addEventListener("click", function(){

        filterButtons.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTodos();
    });
});

function renderTodos(){

    todoList.innerHTML = "";

    let filteredTodos = [...todos];

    if(currentFilter === "active"){

        filteredTodos = todos.filter(
            todo => !todo.completed
        );
    }

    if(currentFilter === "completed"){

        filteredTodos = todos.filter(
            todo => todo.completed
        );
    }

    filteredTodos.forEach(todo => {

        const li = document.createElement("li");

        li.dataset.id = todo.id;

        if(todo.completed){
            li.classList.add("completed");
        }

        const span = document.createElement("span");

        span.textContent = todo.text;

        span.className = "todo-text";

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "❌";

        deleteBtn.className = "delete-btn";

        li.appendChild(span);

        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();
}

function updateCount(){

    const activeTodos =
        todos.filter(todo => !todo.completed).length;

    countDisplay.textContent =
        activeTodos + " items left";
}

function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}