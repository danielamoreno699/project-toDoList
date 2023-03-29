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
    li.classList.add('flex-between');

    li.innerHTML = `<div class="container-input">
    <input id="${todo.id}" type="checkbox" class="checkbox"checked>
    <label for="item1">${todo.desc}</label>
            
    </div>
    <i class="fa-solid fa-trash-can" id="delete-task"></i>`;

    ul.appendChild(li);
  });
};
displayLi();