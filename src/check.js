const taskContainer = document.getElementById('taskContainer');

const checkBox = (arr) => {
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((box, i) => {
    box.addEventListener('click', () => {
      if (arr[i].completed) console.log('true');
      localStorage.setItem('tasks', JSON.stringify(arr));
    });
  });
};

const clearCont = () => {
  taskContainer.innerHTML = '';
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('tasks'));
}

const setLocalStorage = (arr) => {
  localStorage.setItem('tasks', JSON.stringify(arr));
}

export { checkBox, clearCont, getLocalStorage, setLocalStorage };