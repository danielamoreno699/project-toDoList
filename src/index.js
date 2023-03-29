import './style.css';

const arrayToDoList = [
  {
    desc: 'finish microverse proyect',
    completed: false,
    index: 1,
  },
  {
    desc: 'buy groceries',
    completed: false,
    index: 2,
  },
  {
    desc: 'appointment with friend',
    completed: false,
    index: 3,
  },

];

const displayLi = () => {
  arrayToDoList.forEach((todo) => {
    const ul = document.getElementById('items');
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    li.classList.add('flex-between');

    li.innerHTML = `<div class="container-input">
    <input id="${todo.index}" type="checkbox" class="checkbox">
    <label for="${todo.index}" class="todo-list-item ${todo.completed === true ? 'completed' : ''}">
    ${todo.desc}</label>
    
            
    </div>
    <i class="fa-solid fa-trash-can" id="delete-task"></i>`;

    ul.appendChild(li);
    ul.appendChild(hr);
  });
};
displayLi();

const updateCheck = (e) => {
  if (e.target.checked === true) {
    e.target.nextElementSibling.classList.add('completed');
  }

  if (!e.target.checked) {
    e.target.nextElementSibling.classList.remove('completed');
  }
};

const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', updateCheck);
});
