class UI {
  constructor() {
    this.updateCheck = this.updateCheck.bind(this);
  }

    displayToDo = (todo, index) => {
      const ul = document.getElementById('items');
      const li = document.createElement('li');
      const hr = document.createElement('hr');
      li.classList.add('flex-between');

      li.innerHTML = `<div class="container-input">
      <input id="${index}" type="checkbox" class="checkbox">
      <label for="${index}" class="todo-list-item ${todo.completed === true ? 'completed' : ''}">
      ${todo.desc}</label>
      
              
      </div>
      <button class="delete"><i class="fa-solid fa-trash-can" id="delete-task"></i></button>
      `;

      ul.appendChild(li);
      ul.appendChild(hr);

      this.registerEventListeners();
    };

    clearFieldInput =() => {
      const inputList = document.getElementById('myInput');
      inputList.value = '';
    }

    updateCheck = (e) => {
      if (e.target.checked === true) {
        e.target.nextElementSibling.classList.add('completed');
      }

      if (!e.target.checked) {
        e.target.nextElementSibling.classList.remove('completed');
      }
    };

    registerEventListeners = () => {
      const checkboxes = document.querySelectorAll('.checkbox');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', this.updateCheck);
      });
    }
}

export default UI;