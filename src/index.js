import UI from './modules/UI.js';
import ToDoList from './modules/ToDoList.js';

// function to add  List.
export const handleKeyPress = (event) => {
  const ui = new UI();
  const inputList = document.getElementById('myInput');
  const item = inputList.value;
  if (item === null || '') {
    return null;
  }

  if (event.key === 'Enter') {
    const newToDo = new ToDoList(item);

    ui.displayToDo(newToDo);
    newToDo.addList(newToDo);
    ui.clearFieldInput();
    ui.registerEventListeners();
    event.preventDefault();
  }
  return null;
};

// function to remove list when clicking the trash icon.
export const handleDeleteTaskClick = (event) => {
  if (event.target.id === 'delete-task') {
    const todoList = new ToDoList();
    todoList.remove(event.target);
    event.preventDefault();
  }
};

// function to clear all Btn Function

export const HandleClearAll = () => {
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
};

// EventListners

document.getElementById('btn-clearAll').addEventListener('click', HandleClearAll);
document.getElementById('items').addEventListener('click', handleDeleteTaskClick);
document.addEventListener('DOMContentLoaded', () => {
  const inputList = document.getElementById('myInput');
  inputList.addEventListener('keypress', handleKeyPress);
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
