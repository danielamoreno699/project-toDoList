import './style.css';

import UI from './modules/UI.js';

class ToDoList {
  constructor(desc, completed = false, index) {
    this.desc = desc;
    this.completed = completed;
    if (index !== undefined) {
      this.index = index;
    } else {
      const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      const lastIndex = JSON.parse(localStorage.getItem('lastIndex')) || 0;
      this.index = todoList.length > 0 ? todoList[todoList.length - 1].index + 1 : lastIndex + 1;
      localStorage.setItem('lastIndex', JSON.stringify(this.index));
    }
  }

  addList =(todoItem) => {
    let todoList;
    if (localStorage.getItem('todoList') === null) {
      todoList = [];
    } else {
      todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  remove =(target) => {
    const li = target.parentElement.parentElement;
    const hr = li.nextElementSibling;
    const itemIndex = parseInt(li.querySelector('.delete').getAttribute('data-index'), 10);
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const itemToRemoveIndex = todoList.findIndex((item) => item.index === itemIndex);
    todoList.splice(itemToRemoveIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    hr.remove();
    li.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const inputList = document.getElementById('myInput');
  inputList.addEventListener('keypress', (event) => {
    const list = inputList.value;
    if (list === null) {
      return null;
    }

    if (event.key === 'Enter') {
      const newToDo = new ToDoList(list);

      ui.displayToDo(newToDo);
      newToDo.addList(newToDo);
      ui.clearFieldInput();
      ui.registerEventListeners();
      event.preventDefault();
    }
    return null;
  });

  document.getElementById('items').addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox')) {
      return;
    }
    if (e.target.classList.contains('todo-list-item')) {
      return;
    }
    const todoList = new ToDoList();
    todoList.remove(e.target);
    e.preventDefault();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  todoList.forEach((item) => {
    const newToDo = new ToDoList(item.desc, item.completed, item.index);
    ui.displayToDo(newToDo);
  });
});