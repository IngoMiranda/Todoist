const todoForm = document.querySelector('#todo-form');
const inTodo = document.querySelector('#inTodo');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#input-edit');
const cancelEdit = document.querySelector('#cancel-edit-btn');
const todoList = document.querySelector('#todo-list');
const searchInput = document.querySelector('#inSearch');
const eraseBtn = document.querySelector('#clear-btn');
const filterBtn = document.querySelector('#filter-select');


// preciso salvar o valor inicial do input para comprar se ele existe e em seguida realizar a alteração do valor;

let oldInputValue;

// funções 
const saveTodo = (text, done = 0, save = 1)=>{

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
    btnEdit.classList.add('edit-todo');
    btnEdit.innerHTML = '<i class="fi fi-br-edit"></i>';
    todo.appendChild(btnEdit);
    
    const btnCancel = document.createElement('button');
    btnCancel.classList.add('cancel-todo');
    btnCancel.innerHTML = '<i class="fi fi-br-cross-small"></i>';
    todo.appendChild(btnCancel);

    //ações com a local storage

    if(done){
        todo.classList.add("done");
    }

    if(save){
        saveTodoLocalStorage({text, done});
    }

    todoList.append(todo);
    inTodo.value = "";
    inTodo.focus();

};

const toggleForm = ()=>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) =>{
    
    const todos = document.querySelectorAll(".todo");
   
    todos.forEach((todo)=>{
        
        let todoTitle = todo.querySelector("h3");  
        if (todoTitle.innerText === oldInputValue){

            todoTitle.innerText = text;
            
        };
    });
};

const getSearchTodo = (search)=>{
    const todos = document.querySelectorAll(".todo");
    
    todos.forEach((todo)=>{
        
        todo.style.display = "flex";
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase(); 
        const normalaizedSearch =  search.toLowerCase()

        if(!todoTitle.includes(normalaizedSearch)){
            todo.style.display = "none";
        };
       
    });
};

const filterTodos = (filterValue)=>{
    const todos = document.querySelectorAll(".todo");

    switch(filterValue){

        case "all":
            todos.forEach((todo)=>{ 
                todo.style.display ="flex";
                const tagDone = document.querySelector("#done");
                tagDone.style.display = "flex"
                const tagTodo = document.querySelector("#todo");
                tagTodo.style.display = "flex";
            });
            break;

        case "done":
            todos.forEach((todo)=>{
                todo.classList.contains("done") ? (todo.style.display ="flex") : (todo.style.display ="none");
                const tagDone = document.querySelector("#done");
                tagDone.style.display = "flex"
                const tagTodo = document.querySelector("#todo");
                tagTodo.style.display = "none";
            });
            break;
        case "todo":
            todos.forEach((todo)=>{ 
                !todo.classList.contains("done") ? (todo.style.display ="flex") : (todo.style.display ="none" );
                const tagTodo = document.querySelector("#todo");
                tagTodo.style.display = "flex";
                const tagDone = document.querySelector("#done");
                tagDone.style.display = "none"
            });
            break;
        default:
            break;
    }
}

// Eventos

todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputValue = inTodo.value;
    if(inputValue){
        saveTodo(inputValue);
    };

});

document.addEventListener('click', (e)=>{
    const targetEl = e.target;
    const parenteEl = targetEl.closest('div'); // seleciona o elemento pai mais próximo
    let todoTitle; // variável que conterar o titulo a busca não está sendo realizada pelo id (erro)

    if(parenteEl && parenteEl.querySelector("h3")){
        todoTitle = parenteEl.querySelector("h3").innerText;
    };

    if(targetEl.classList.contains('finish-todo')){
        parenteEl.classList.toggle('done');

    };

    if(targetEl.classList.contains('cancel-todo')){
        parenteEl.remove();

    };

    if(targetEl.classList.contains('edit-todo')){
       toggleForm();

       editInput.value = todoTitle;
       oldInputValue = todoTitle;

    };


});

cancelEdit.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleForm();
});

editForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    };

    toggleForm();
});

searchInput.addEventListener("keyup", (e) =>{
    
    const search = e.target.value; // quando o alvo do evento é o input podemos pegar o valor direto dele. 
    getSearchTodo(search);

});

eraseBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup")); // 
});

filterBtn.addEventListener("change", (e)=>{
    const filterValue = e.target.value;
    filterTodos(filterValue);
});

// local storage 

const getTodosLocalStorage = () =>{
    //  imprimindo valor da local 
    const todos = JSON.parse(localStorage.getItem("todos")) || []; // convertendo o Json em objeto
    return todos;
};

const saveTodoLocalStorage = (todo) =>{

    const todos = getTodosLocalStorage(); // buscando valor da local
    todos.push(todo); // adicionando valor 
    localStorage.setItem("todos", JSON.stringify(todos)); // salvando no local e convertendo em string 

};