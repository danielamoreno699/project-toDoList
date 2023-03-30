class UI {
    constructor() {
      this.updateCheck = this.updateCheck.bind(this);
      //this.updateItem = this.updateItem.bind(this)
    }
  
    displayToDo = (todo) => {
      const ul = document.getElementById('items');
      const li = document.createElement('li');
      const hr = document.createElement('hr');
      li.classList.add('flex-between');
  
      li.innerHTML = `<div class="container-input">
        <input id="${todo.index}" type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        <input id="${todo.index}-inputTxt" class="todo-list-item ${todo.completed ? 'completed' : ''}" type="text" value="${todo.desc}">
      </div>
      <button class="delete" data-index="${todo.index}"><i class="fa-solid fa-trash-can" id="delete-task"></i></button>`;
  
      ul.appendChild(li);
      ul.appendChild(hr);
  
      this.registerEventListeners();
    };
  
    clearFieldInput =() => {
      const inputList = document.getElementById('myInput');
      inputList.value = '';
    }
  
    updateCheck = (e) => {
      const index = e.target.id;
      const input = document.querySelector(`input[id="${index}-inputTxt"].todo-list-item`);
      console.log(input)
      if (e.target.checked) {
        input.classList.add('completed');
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        const todoItem = todoList.find((item) => item.index === Number(index));
        todoItem.completed = true;
        localStorage.setItem('todoList', JSON.stringify(todoList));
      } else {
        input.classList.remove('completed');
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        const todoItem = todoList.find((item) => item.index === Number(index));
        todoItem.completed = false;
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }
    };
  
    
      
      updateItem = (e) => {
        const index = e.target.id.split('-')[0];
        const value = e.target.value;
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        const todoItem = todoList.find((item) => item.index === Number(index));
        todoItem.desc = value;
        localStorage.setItem('todoList', JSON.stringify(todoList));
      };
      
      registerEventListeners = () => {
          const checkboxes = document.querySelectorAll('.checkbox');
          checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', this.updateCheck);
          });
      
          const inputTexts = document.querySelectorAll('.todo-list-item');
          inputTexts.forEach((inputText) => {
            inputText.addEventListener('input', this.updateItem);
          });
        }
  

    }
  export default UI;
  

