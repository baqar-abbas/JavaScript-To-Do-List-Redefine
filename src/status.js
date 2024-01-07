/* eslint-disable */
import { todoItems } from './todo.js';

const updateCompletedStatus = (index, completed) => {
const task = todoItems.find((item) => item.index === index);
const checkbox = document.querySelector(`.checkbox[data-key='${index}']`);
checkbox.checked ? task.completed = true : task.completed = false;
// task.completed = completed;
localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

export default updateCompletedStatus;