import UI from './UI.js';

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
    const ui = new UI();
    todo.forEach((todoItem, index) => {
      ui.displayToDo(todoItem, index);
    });
    ui.registerEventListeners();
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

export default Store;