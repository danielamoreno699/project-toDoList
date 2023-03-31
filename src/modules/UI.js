class UI {
  constructor() {
    this.updateCheck = this.updateCheck.bind(this);
    this.dragEnter = this.dragEnter.bind(this)
  }

    // displays array of lists
    displayToDo = (todo) => {
      const ul = document.getElementById('items');
      const li = document.createElement('li');
      // const hr = document.createElement('hr');
      li.classList.add('flex-between');

      li.innerHTML = `<div class="container-input  draggable draggable-list" draggable="true" data-index="${todo.index} >
        <input id="${todo.index}" type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        <input id="${todo.index}-inputTxt" class="todo-list-item ${todo.completed ? 'completed' : ''}" type="text" value="${todo.desc}">
      </div>
      <button class="delete" data-index="${todo.index}"><i class="fa-solid fa-trash-can" id="delete-task"></i></button>`;

      ul.appendChild(li);
      // ul.appendChild(hr);

      this.registerEventListeners();
    };

    clearFieldInput =() => {
      const inputList = document.getElementById('myInput');
      inputList.value = '';
    }

    updateCheck = (e) => {
      const index = e.target.id;
      const input = document.querySelector(`input[id="${index}-inputTxt"].todo-list-item`);
      const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      const todoItem = todoList.find((item) => item.index === Number(index));

      if (todoItem) {
        if (e.target.checked) {
          input.classList.add('completed');
          todoItem.completed = true;
        } else {
          input.classList.remove('completed');
          todoItem.completed = false;
        }

        localStorage.setItem('todoList', JSON.stringify(todoList));
      }
    };

    // edits the description value with addeventlistener
      updateItem = (e) => {
        const index = e.target.id.split('-')[0];
        const { value } = e.target;
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        const todoItem = todoList.find((item) => item.index === Number(index));
        todoItem.desc = value;
        localStorage.setItem('todoList', JSON.stringify(todoList));
      };


      //SawpItems function

      swapItems = (fromIndex, toIndex )=>{
        console.log(123)
      }

      // dragStar function
      dragStart = (e) => {
        
        const div = e.target.closest('div');
        const dragStartIndex = div.dataset.index;
        console.log('event', 'dragstart');
        console.log('indexStart', dragStartIndex)
      
      }

       // dragEnter function
       dragEnter = (e) => {
         const li = e.target.parentNode;
         li.classList.add('over');
            //console.log(li)
            //console.log('event', 'dragEnter');
       }

       // dragStar function
       dragLeave = (e) => {
         const li = e.target.parentNode;
         li.classList.remove('over');
         //this.classList.remove('over');
         //console.log('event', 'dragleave');
       }

       // dragStar function
       dragOver = (e) => {
        e.preventDefault()
         //console.log('event', 'dragOver');
       }

       // dragStar function
       dragDrop = (e) => {
        const dragEndIndex = e.target.getAttribute('data-index')
        const li = e.target.parentNode;
         
        console.log('indexdrop', dragEndIndex)
         this.swapItems(this.dragStartIndex, dragEndIndex)
        li.classList.remove('over');
         console.log('event', 'dragdrop');
       }

       

      // event registration for checkbox and input text. Updates values
      registerEventListeners = () => {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener('click', this.updateCheck);
        });

        const inputTexts = document.querySelectorAll('.todo-list-item');
        inputTexts.forEach((inputText) => {
          inputText.addEventListener('input', this.updateItem);
        });

  
        const draggables = document.querySelectorAll('li');
        const dragListItems = document.querySelectorAll('li');

        draggables.forEach((draggable) => {
          draggable.addEventListener('dragstart', this.dragStart);
        });

        dragListItems.forEach((item) => {
          item.addEventListener('dragover', this.dragOver);
          item.addEventListener('drop', this.dragDrop);
          item.addEventListener('dragenter', this.dragEnter);
          item.addEventListener('dragleave', this.dragLeave);
        });
      };
}
export default UI;
