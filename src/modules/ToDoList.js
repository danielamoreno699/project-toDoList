class ToDoList {
  constructor(desc, completed = false) {
    this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    this.desc = desc;
    this.completed = completed;
    this.index = (this.todoList.length || 0) + 1;
  }

  // function to reorder index
  reorderTodoList = (todoList) => {
    const reorderedList = todoList.map((item, index) => {
      item.index = index + 1;
      return item;
    });
    return reorderedList;
  };

  // function to addList
  addList = () => {
    this.todoList.push({
      desc: this.desc,
      completed: this.completed,
      index: this.index,
    });
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    this.index += 1;
  };

  // function to remove
  remove = (target) => {
    const li = target.parentElement.parentElement;
    const hr = li.nextElementSibling;
    const itemIndex = parseInt(li.querySelector('.delete').getAttribute('data-index'), 10);
    const itemToRemoveIndex = this.todoList.findIndex((item) => item.index === itemIndex);
    this.todoList.splice(itemToRemoveIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    hr.remove();
    li.remove();

    const reorderedList = this.reorderTodoList(this.todoList);
    localStorage.setItem('todoList', JSON.stringify(reorderedList));
  };
}

export default ToDoList;
