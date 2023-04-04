import './style.css';
import UI from './modules/UI.js';

class ToDoList {
  constructor(desc, completed = false, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index ?? this.getNextIndex();
  }

  getNextIndex =() => {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const lastIndex = JSON.parse(localStorage.getItem('lastIndex')) || 0;
    return todoList.length > 0 ? todoList[todoList.length - 1].index + 1 : lastIndex + 1;
  }

  // function to reorder index
  reorderTodoList = (todoList) => {
    const reorderedList = todoList.map((item, index) => {
      item.index = index + 1;
      return item;
    });
    return reorderedList;
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
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const itemToRemoveIndex = todoList.findIndex((item) => item.index === itemIndex);
    todoList.splice(itemToRemoveIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    hr.remove();
    li.remove();

    const reorderedList = this.reorderTodoList(todoList);
    localStorage.setItem('todoList', JSON.stringify(reorderedList));
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
  const toDoList = new ToDoList();
  const ui = new UI();

  todoListContainer.childNodes.forEach((child) => {
    if (child.nodeName === 'LI') {
      const hr = child.nextElementSibling;
      const inputEl2 = child.querySelector('.todo-list-item');

      const isCompleted = inputEl2.classList.contains('completed');
      if (isCompleted) {
        const parentElement = inputEl2.parentNode.parentNode;
        parentElement.remove();
        hr.remove();
      }
    }
  });

  const newtodoList = todoList.filter((item) => item.completed !== true);
  const reorderedList = toDoList.reorderTodoList(newtodoList);

  localStorage.setItem('todoList', JSON.stringify(reorderedList));
  todoListContainer.innerHTML = '';
  reorderedList.forEach((item) => ui.displayToDo(item));
});