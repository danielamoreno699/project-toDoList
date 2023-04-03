class UI {
  constructor() {
    this.updateCheck = this.updateCheck.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragStartIndex = null; 
  }

    // displays array of lists
    displayToDo = (todo) => {
      const ul = document.getElementById('items');
      const li = document.createElement('li');
      // const hr = document.createElement('hr');
      li.classList.add('flex-between');
      

      li.innerHTML = `

      <div class= "draggable-list draggable"  draggable="true" data-index="${todo.index}">
      <div class=  "container-input "  >
      
 
      <input id="${todo.index}" type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        <input id="${todo.index}-inputTxt" class="todo-list-item ${todo.completed ? 'completed' : ''}" type="text" value="${todo.desc}">
      </div>
      <button class="delete" data-index="${todo.index}"><i class="fa-solid fa-trash-can" id="delete-task"></i></button> </div>`;
      
      

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


      

      // dragStar function
      dragStart = (e) => {
        const div = e.target.closest('div');
        const dragStartIndex = div.dataset.index;
        console.log('event', 'dragstart');
        console.log('indexStart', dragStartIndex)
        this.dragStartIndex = dragStartIndex;
      
      }

       // dragEnter function
       dragEnter = (e) => {
         const li = e.target.parentNode;
         li.classList.add('over');
         
       }

       // dragStar function
       dragLeave = (e) => {
         const li = e.target.parentNode;
         li.classList.remove('over');
    
       }

       // dragStar function
       dragOver = (e) => {
        e.preventDefault()
     
       }

       // dragStar function
       dragDrop = (e) => {
        const draggableEl = e.target.closest('.draggable');
      const dragEndIndex = draggableEl.getAttribute('data-index');
   
      
        const li = e.target.parentNode;
         
        console.log('indexdrop', dragEndIndex)
         this.swapItems(this.dragStartIndex, dragEndIndex)
        li.classList.remove('over');
         console.log('event', 'dragdrop');
       }

       //SawpItems function

      swapItems = (fromIndex, toIndex )=> {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

        console.log('fromIndex:', fromIndex);
        console.log('toIndex:', toIndex);
        console.log('todoList:', todoList);

       
       
        const elementOne = document.querySelector(`[data-index="${fromIndex}"]`)
        const elementTwo = document.querySelector(`[data-index="${toIndex}"]`)

        console.log('ele1', elementOne)
        console.log('ele2', elementTwo)
    
        
     

        const parentOne = elementOne.parentElement;
        const parentTwo = elementTwo.parentElement;

        parentOne.appendChild(elementTwo)
        parentTwo.appendChild(elementOne)

         // update the todoList array with the new order of items
  const indexOne = todoList.findIndex(item => item.index === fromIndex);
  const indexTwo = todoList.findIndex(item => item.index === toIndex);

  const temp = todoList[indexOne];
  todoList[indexOne] = todoList[indexTwo];
  todoList[indexTwo] = temp;

  localStorage.setItem('todoList', JSON.stringify(todoList));
        
 

  // Store the updated list in local storage

     


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
