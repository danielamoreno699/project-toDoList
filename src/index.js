import './style.css';

import ToDoList from './modules/ToDoList.js';
import UI from './modules/UI.js';

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

    if (itemRemoved === null) {
      return;
    }

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
    if (list === null) {
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

  document.getElementById('items').addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox')) {
      return;
    }
    Store.removeList(e.target);
    e.preventDefault();
  });

  document.getElementById('btn-clearAll').addEventListener('click', () => {
    if (Store.getToDoList().length >= 1) {
      localStorage.clear();
      window.location.reload();
    }
  });
});