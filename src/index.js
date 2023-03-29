/* eslint-disable max-classes-per-file */
import './style.css';
import ToDoList from './modules/ToDoList.js';
import UI from './modules/UI.js';
import Store from './modules/Store.js';

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
