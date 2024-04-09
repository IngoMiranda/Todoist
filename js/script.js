const todoForm = document.querySelector('#todo-form');
const inTodo = document.querySelector('#inTodo');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#editInput');
const cancelEdit = document.querySelector('#cancel-edit-btn');
const todoList = document.querySelector('#todo-list');

// funções 
const saveTodo = (text)=>{

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const btnCheck = document.createElement('button');
    btnCheck.classList.add('finish-todo');
    btnCheck.innerHTML = '<i class="fi fi-br-check"></i>';
    todo.appendChild(btnCheck);

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('finish-todo');
    btnEdit.innerHTML = '<i class="fi fi-br-edit"></i>';
    todo.appendChild(btnEdit);
    
    const btnCancel = document.createElement('button');
    btnCancel.classList.add('finish-todo');
    btnCancel.innerHTML = '<i class="fi fi-br-cross-small"></i>';
    todo.appendChild(btnCancel);

    todoList.append(todo);

}

function clearIntput(){
    inTodo.value = "";
};


// Eventos

todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputValue = inTodo.value;
    
    if(inputValue){
        saveTodo(inputValue);
    }
    clearIntput(inTodo.value);
});