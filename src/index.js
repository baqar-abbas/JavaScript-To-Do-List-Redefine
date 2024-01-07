import { addTask, todoItems } from './todo.js';
import updateCompletedStatus from './status.js';
import './index.css';
import select2 from '../images/select.png';
import delete2 from '../images/delete.png';
import refresh from '../images/refresh.png';
import edit from '../images/edit.jpg';

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
  todoItems.sort((a, b) => a.index - b.index); // sort the array by index
  ul.innerHTML = ''; // clear the list before re-rendering

  // Re-render the todo list
  for (let i = 0; i < todoItems.length; i += 1) {
    const node = document.createElement('li');
    node.setAttribute('class', 'todo-item editable');
    node.setAttribute('data-key', todoItems[i].index);
    node.innerHTML = `
    <input type="checkbox" class="checkbox" id="${todoItems[i].index}">
    <label for="${todoItems[i].index}" class="option">
    <img class="select" src=${select2} alt=""/>
            <img class="delete" src=${delete2} alt=""/>
            <img class="edit" src=${edit} alt="edittext"/>
    </label>
    <input class="items" type="text" value="${todoItems[i].text}" readonly /> 
    `;
    ul.appendChild(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const refresh = document.querySelector('.refresh');
    const editoption = node.querySelector('.edit');
    // Get the checkbox element for this task
    const checkbox = node.querySelector('.checkbox');

    // Add an event listener for the selectdots
    selectdots.addEventListener('click', () => {
      selectdots.style.display = 'none';
      deleteoption.style.display = 'block';
      editoption.style.display = 'block';
    });

    // Add refersh button logic
    refresh.addEventListener('click', () => {
      window.location.reload();
    });

    // Add a change event listener for the checkbox
    checkbox.addEventListener('change', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);
      const completed = !!checkbox.checked;
      updateCompletedStatus(itemIndex, completed);

      // If the task is completed, add a strikethrough to the text
      if (completed) {
        node.querySelector('.items').style.textDecoration = 'line-through';
      } else {
        node.querySelector('.items').style.textDecoration = 'none';
      }
    });
    // Add an event listener for the clear all completed button
    const clearAllCompleted = () => {
      const uncompletedTasks = todoItems.filter((item) => !item.completed);
      todoItems.length = 0;
      todoItems.push(...uncompletedTasks);
      for (let i = 0; i < uncompletedTasks.length; i += 1) {
        uncompletedTasks[i].index = i + 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      display();
    };

    btnDeleteAll.addEventListener('click', clearAllCompleted);

    // Add an event listener for the deleteoption
    deleteoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);

      // Delete the item from the todoItems array
      todoItems.splice(itemIndex, 1);

      // Re-Index the remaining items
      for (let j = itemIndex; j < todoItems.length; j += 1) {
        todoItems[j].index -= 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      display();
    });

    // Add an event listener for the editoption
    editoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);

      // Toggle the readonly attribute
      const items = node.querySelector('.items');
      items.readOnly = !items.readOnly;

      // Toggle the editable class on the li element
      node.classList.toggle('editable');

      if (!items.readOnly) {
        items.focus();
      }

      // If the user clicks enter editing the item, update the todoItems array
      items.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newTaskText = items.value.trim();
          todoItems[itemIndex].text = newTaskText;
          localStorage.setItem('todoItems', JSON.stringify(todoItems));
          display();
        }
      });
      // Add an event listener to the input element to toggle the editable class
      items.addEventListener('blur', () => {
        node.classList.toggle('editable');
      });
    });
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = document.querySelector('.inputText');
  const text = inputText.value.trim();
  if (text !== '') {
    addTask(text);
    inputText.value = '';
    display();
  }
});

window.onload = display();
