/* eslint-disable max-classes-per-file */
import './style.css';

class ToDoList {
  constructor(desc, completed = false, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index;
  }
}

class UI {
  constructor() {
    this.updateCheck = this.updateCheck.bind(this);
  }

  displayToDo = (todo, index) => {
    const ul = document.getElementById('items');
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    li.classList.add('flex-between');

    li.innerHTML = `<div class="container-input">
    <input id="${index}" type="checkbox" class="checkbox">
    <label for="${index}" class="todo-list-item ${todo.completed === true ? 'completed' : ''}">
    ${todo.desc}</label>
    
            
    </div>
    <button class="delete"><i class="fa-solid fa-trash-can" id="delete-task"></i></button>
    `;

    ul.appendChild(li);
    ul.appendChild(hr);

    this.registerEventListeners();
  };

  clearFieldInput =() => {
    const inputList = document.getElementById('myInput');
    inputList.value = '';
  }

  updateCheck = (e) => {
    if (e.target.checked === true) {
      e.target.nextElementSibling.classList.add('completed');
    }

    if (!e.target.checked) {
      e.target.nextElementSibling.classList.remove('completed');
    }
  };

  registerEventListeners = () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', this.updateCheck);
    });
  }
}

class Store {
  static getToDoList() {
    let todoList;
    if (localStorage.getItem('todoList') === null) {
      todoList = [];
    } else {
      todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    return todoList;
  }

  static displaytoDolist() {
    const todo = Store.getToDoList();
    todo.forEach((todoItem, index) => {
      const ui = new UI();
      ui.displayToDo(todoItem, index);
    });
  }

  static addList(todoItem) {
    const todoList = Store.getToDoList();
    todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  static removeList(target) {
    const li = target.parentElement.parentElement;
    const hr = li.nextElementSibling;
    const itemRemoved = parseInt(li.querySelector('label').htmlFor, 10);
    const todoList = Store.getToDoList();
    const findIndex = todoList.findIndex((index) => index === itemRemoved);
    todoList.splice(findIndex, 1);
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
    if (!list) {
      return null;
    }

    if (event.key === 'Enter') {
      const newToDo = new ToDoList(list);
      ui.displayToDo(newToDo, Store.getToDoList().length);
      Store.addList(newToDo);
      ui.clearFieldInput();
      ui.registerEventListeners();
      event.preventDefault();
    }
    return null;
  });

  Store.displaytoDolist();
});

document.getElementById('items').addEventListener('click', (e) => {
  Store.removeList(e.target);
  e.preventDefault();
});

document.getElementById('btn-clearAll').addEventListener('click', () => {
  if (Store.getToDoList().length >= 1) {
    localStorage.clear();
    window.location.reload();
  }
});
