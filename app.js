const form = document.getElementById('todoAddForm');
const addInput = document.getElementById('todoName');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const todoList = document.querySelector('.list-group');
const todoSearch = document.getElementById('todoSearch');
const clearButton = document.getElementById('clearButton');

runEvents();

let todos = [];

function runEvents () {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', pageLoaded);
    secondCardBody.addEventListener('click', removeTodoToUI);
    clearButton.addEventListener('click', clearAllTodos);
    todoSearch.addEventListener('keyup', filterTodos);
}

function pageLoaded () {

    todoStorageChecked();
    todos.forEach((todo) => {
        addTodoToUI(todo);
    });

}

function addTodo (e) {

    e.preventDefault();
    
    const inputText = addInput.value.trim();

    if(inputText === null || inputText === "") {
        showAlert("warning", "Burayi Doldurun !");
    }
    else {
        //! Ekranda Yaranisi
        addTodoToUI(inputText);

        //! LocalStorage'de Yaradilisi
        addTodoToStorage(inputText);

        showAlert("success", "Todo Yaradildi.");

    }

}

function addTodoToUI (newTodo) {

    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //                         <a href="#" class="delete-item">
    //                             <i class="fa fa-remove"></i>
    //                         </a>
    //                     </li>

    const li = document.createElement('div');
    li.className = 'list-group-item d-flex justify-content-between';
    li.textContent = newTodo;

    const a = document.createElement('a');
    a.className = 'delete-item';
    a.href = "#";

    const i = document.createElement('i');
    i.className = 'fa fa-remove';

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = '';

}

function addTodoToStorage (newTodo) {

    todoStorageChecked();

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function todoStorageChecked () {

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

}

function showAlert (typeBgColor, message) {

    // <div class="alert alert-warning" role="alert">
    //     This is a warning alert—check it out!
    // </div>

    const div = document.createElement('div');
    div.className = `alert alert-${typeBgColor}`
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1800);

}

function removeTodoToUI (e) {

    if(e.target.className === 'fa fa-remove') {

        //! Ekrandan Silmek
        let todo = e.target.parentElement.parentElement;
        todo.remove();

        //! Local Storageden Silmek
        removeToStorage(todo.textContent);

        showAlert("success", "Secdiyiniz Todo Silindi.");

    }   

}

function removeToStorage (removeTodo) {

    todoStorageChecked();

    todos.forEach((todo, idx) => {
        if(removeTodo === todo) {
            todos.splice(idx, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));

}

function clearAllTodos () {

    const todoListesi = document.querySelectorAll('.list-group-item');

    if(todoListesi.length > 0) {
        todoListesi.forEach((todo) => {
            todo.remove();
        });
        showAlert("success", "Butun Todo'lar Silindi.")
    }
    else {
        showAlert("warning", "Hec bir Todo Yoxdur !")
    }

    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));

}

function filterTodos (e) {

    let inputValue = e.target.value.toLowerCase().trim();
    let todoListesi = document.querySelectorAll('.list-group-item');

    if(todoListesi.length > 0) {
        todoListesi.forEach((todo) => {
            if(todo.textContent.toLocaleLowerCase().trim().includes(inputValue)){
                todo.setAttribute('style', 'display: block')
            }
            else {
                todo.setAttribute('style', 'display: none !important');
            }
        });
    }
    else {
        showAlert("warning", "Axtarilacak Hec Bir Todo Yoxdur !")
    }

}