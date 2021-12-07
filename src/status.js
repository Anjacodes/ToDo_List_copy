import { checkBox, clearCont, getLocalStorage, setLocalStorage } from './check.js';

const addTask = document.querySelector('.subheading');

// let task;
let input;
const taskContainer = document.getElementById('taskContainer');

// const getLocalStorage = () => {
//   return JSON.parse(localStorage.getItem('tasks'));
// }

// const setLocalStorage = (arr) => {
//   localStorage.setItem('tasks', JSON.stringify(arr));
// }

const tasks = [];
function Task(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

const editDescription = () => {
  const labels = document.querySelectorAll('label');
  const editSpan = document.querySelectorAll('.red');
  labels.forEach((label, i) => {
    label.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input = label.innerText;
        // const stored = JSON.parse(localStorage.getItem('tasks'));
        const stored = getLocalStorage();
        stored[i].description = input;
        // localStorage.setItem('tasks', JSON.stringify(stored));
        setLocalStorage(stored);
        editSpan[i].style.display = 'block';
        setTimeout(() => {
          editSpan[i].style.display = 'none';
        }, 3000);
      }
    });
  });
};

const generateTasks = (arr) => {
  arr.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('listEl');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const edited = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('editBtn');
    deleteBtn.classList.add('deleteBtn');
    edited.innerText = '✓';
    edited.classList.add('red');
    edited.classList.add('editBtn');
    input.type = 'checkbox';
    input.classList.add('checkbox');
    label.setAttribute('contenteditable', true);
    if (task.completed === true) (input.checked = true); else (input.checked = false);
    label.textContent = task.description;
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    li.appendChild(edited);
    taskContainer.appendChild(li);
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach((box, i) => {
      box.addEventListener('click', () => {
        if (box.checked === true) {
          arr[i].completed = true;
        } else {
          arr[i].completed = false;
        }
        // localStorage.setItem('tasks', JSON.stringify(tasks));
        setLocalStorage(tasks);
      });
    });
    editDescription();
  });
  deleteTask(arr);
  clearAll(arr);
};

addTask.addEventListener('keypress', (e) => {
  if (addTask.value !== '' && e.key === 'Enter') {
    if (localStorage.length !== 0) {
      // const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      const storedTasks = getLocalStorage();
      const task = new Task(addTask.value, false, storedTasks.length);
      storedTasks.push(task);
      // localStorage.setItem('tasks', JSON.stringify(storedTasks));
      setLocalStorage(storedTasks);
      clearCont();
      generateTasks(storedTasks);
      checkBox(storedTasks);
      addTask.value = '';
    } else {
      const task = new Task(addTask.value, false, tasks.length);
      tasks.push(task);
      // localStorage.setItem('tasks', JSON.stringify(tasks));
      setLocalStorage(tasks);
      clearCont();
      generateTasks(tasks);
      checkBox(tasks);
    }
  }
});

const deleteTask = (arr) => {
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((button, i) => {
    button.addEventListener('click', () => {
      if (localStorage.length !== 0) {
        // const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const storedTasks = getLocalStorage();
        storedTasks.splice(i, 1);
        storedTasks.forEach((task, i) => {
          task.index = i;
        });
        // localStorage.setItem('tasks', JSON.stringify(storedTasks));
        setLocalStorage(storedTasks);
        clearCont();
        generateTasks(storedTasks);
      } else {
        arr.splice(i, 1);
        arr.forEach((task, i) => {
          task.index = i;
        });
        // localStorage.setItem('tasks', JSON.stringify(arr));
        setLocalStorage(arr);
        clearCont();
        generateTasks(arr);
      }
    });
  });
};

const clearAll = (arr) => {
  const clearBtn = document.querySelector('.clearBtn');
  clearBtn.addEventListener('click', () => {
    const openTasks = arr.filter((task) => task.completed === false);
    openTasks.forEach((task, i) => {
      task.index = i;
    });
    // localStorage.setItem('tasks', JSON.stringify(openTasks));
    setLocalStorage(openTasks);
    clearCont();
    generateTasks(openTasks);
  });
};

export {
  tasks, editDescription, deleteTask, clearAll, generateTasks,
};