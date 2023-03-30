class ToDoList {
    constructor(desc, completed = false, index) {
      this.desc = desc;
      this.completed = completed;
      if (index !== undefined) {
        this.index = index;
      } else {
        const lastIndex = JSON.parse(localStorage.getItem('lastIndex')) || 0;
        this.index = lastIndex + 1;
        localStorage.setItem('lastIndex', JSON.stringify(this.index));
      }
    }
}

export default ToDoList;