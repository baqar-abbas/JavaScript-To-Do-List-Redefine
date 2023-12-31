/* eslint-disable */
import './index.css';
import select2 from '../images/select.png';
import delete2 from '../images/delete.png';
import refresh from '../images/refresh.png';
// import edit from '../images/edit.jpg';

let order =0;
const todoItems = [
    {
    text: 'Practice on Vanilla JavaScript',
    completed: false,
    index: order
    },
    {
        text: 'Practice on React',
        completed: false,
        index: order+=1
    },
    {
        text: 'Practice on Ruby on Rails',
        completed: false,
        index: order+=1
    }
];

const container = document.querySelector('#container');
const form = document.querySelector('.form');
const ul = document.querySelector('.todolist');

form.innerHTML = `
<label for="title" class="title">
Today's To Do <img src=${refresh} class="refresh" alt="refresh">
</label>
<input type="text" class="inputText" id="title" placeholder="Add to your list...">
`;

const btnDeleteAll = document.createElement('button');
btnDeleteAll.setAttribute('class', 'delete-all');
btnDeleteAll.textContent = 'Clear all completed';
container.appendChild(btnDeleteAll);

const display = () => {
    ul.innerHTML = '';
    todoItems.forEach((item) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'todo-item');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" id="${item.index}">
        <span class="items">${item.text}</span>
        <label for="${item.index}" class="option">
        <img class="select"  src=${select2} alt="select"/> 
        <img class="delete"  src=${delete2} alt="delete"/>
        </label>
        `;
        ul.appendChild(li);
    });
}

window.onload = display();
