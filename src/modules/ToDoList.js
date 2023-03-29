class ToDoList {
  constructor(desc, completed = false, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index;
  }
}

export default ToDoList;