//import _ from 'lodash';
import './style.css';

// function component() {
//   const element = document.createElement('div');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');

//   return element;
// }
// document.body.appendChild(component());

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

// const ul = document.getElementById('items');
// const li = document.createElement('li');

const displayLi = () => {
  arrayToDoList.forEach((todo) => {
     const ul = document.getElementById('items');
     const li = document.createElement('li');
    li.classList.add('flex-between');

    li.innerHTML = `<div class="container-input">
    <input id="${todo.id}" type="checkbox" class="checkbox"checked>
    <label for="item1">${todo.desc}</label>
            
    </div>
    <img class="w4"src="../assets/three-dots-svgrepo-com.svg" alt="">`;

    //ul.innerHTML += liContent;
    ul.appendChild(li);
 })
}
displayLi();