class ToDoList {
  constructor(desc, completed = false, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index ?? this.getNextIndex();
  }

    // function to get to next INDEX
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

export default ToDoList;