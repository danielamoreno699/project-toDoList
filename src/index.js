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

  // function to addList
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

  // function to remove
  remove = (target) => {
    const li = target.parentElement.parentElement;
    const hr = li.nextElementSibling;
    const itemIndex = parseInt(li.querySelector('.delete').getAttribute('data-index'), 10);
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    const itemToRemoveIndex = todoList.findIndex((item) => item.index === itemIndex);
    todoList.splice(itemToRemoveIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    hr.remove();
    li.remove();

    // Reorder indexes
    todoList = todoList.map((item, index) => {
      item.index = index + 1;
      return item;
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };
}

// EventListening to add with List.
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const inputList = document.getElementById('myInput');
  inputList.addEventListener('keypress', (event) => {
    const list = inputList.value;
    if (list === null || '') {
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

  // EventListening to remove list when clicking the trash icon.
  document.getElementById('items').addEventListener('click', (e) => {
    if (e.target.id === 'delete-task') {
      const todoList = new ToDoList();
      todoList.remove(e.target);
      e.preventDefault();
    }
  });
});

// Refresh the page with localStorage List
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  todoList.forEach((item) => {
    const newToDo = new ToDoList(item.desc, item.completed, item.index);
    ui.displayToDo(newToDo);
  });
});

// clear all Btn

document.getElementById('btn-clearAll').addEventListener('click', () => {
  const todoList = JSON.parse(localStorage.getItem('todoList'));
  const todoListContainer = document.getElementById('items');

  todoListContainer.childNodes.forEach((child) => {
    if (child.nodeName === 'LI') {
      const hr = child.nextElementSibling;

      const inputEl2 = child.querySelector('.todo-list-item');

      const isCompleted = inputEl2.classList.contains('completed');

      if (isCompleted === true) {
        child.remove();
        hr.remove();
      }
    }
  });
  const newtodoList = todoList.filter((item) => item.completed !== true);

  const reorderedList = newtodoList.map((item, index) => {
    item.index = index + 1;
    return item;
  });
  localStorage.setItem('todoList', JSON.stringify(reorderedList));
  window.location.reload();
});