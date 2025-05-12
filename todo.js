const button = document.getElementById('add-list');
const listTodo = document.getElementById('list-todo');
const inputBox = document.getElementById('input-box');

let todos = [];

window.onload = () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodo(todo.text, todo.completed));
};

button.addEventListener('click', () => {
  const value = inputBox.value.trim();
  if (value === '') return;

  const newTodo = { text: value, completed: false };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  addTodo(newTodo.text, newTodo.completed);
  inputBox.value = '';
});

function addTodo(text, completed) {
  const listItem = document.createElement('li');
  listItem.innerText = text;
  if (completed) listItem.classList.add('completed');

  listTodo.appendChild(listItem);

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    toggleCompletion(text);
  });

  listItem.addEventListener('dblclick', () => {
    listTodo.removeChild(listItem);
    removeTodo(text);
  });
}

function toggleCompletion(text) {
  const index = todos.findIndex(todo => todo.text === text);
  if (index > -1) {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function removeTodo(text) {
  todos = todos.filter(todo => todo.text !== text);
  localStorage.setItem('todos', JSON.stringify(todos));
}

