import { todoItems } from './todo.js';

const updateCompletedStatus = (index, completed) => {
// const task = todoItems.find((item) => item.index === index+1);
  const task = todoItems.find((item) => item.index === index + 1);
  task.completed = completed;
  // task.completed = completed;
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

export default updateCompletedStatus;