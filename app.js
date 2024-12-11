// 1
function swapTexts() {
  const block4 = document.querySelector('.block4 p');
  const block2 = document.querySelector('.block2 p');

  const tempContent = block4.textContent;
  block4.textContent = block2.textContent;
  block2.textContent = tempContent;
}

// 2
function calculateOvalArea(r1, r2) {
  const area = Math.PI * r1 * r2;
  document.querySelector('.sub-block2-3 p').textContent = `Oval area is ${area.toFixed(2)}`;
}

// 3
function findDivisors() {
  const inputField = document.querySelector('.sub-block1-3 .number-input');
  const num = Math.floor(parseFloat(inputField.value)); // Extract integer part from input field

  if (isNaN(num) || num <= 0) {
    alert('Please enter a valid natural number.');
    return;
  }

  const divisors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }
  alert(`Divisors: ${divisors.join(', ')}`);
  document.cookie = `divisors=${divisors.join(', ')}; path=/;`;
  document.querySelector('.block3 .divisors-output').textContent = `Divisors saved: ${divisors.join(', ')}`;
}

function checkCookies() {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('divisors='));
  if (cookies) {
    const divisors = cookies.split('=')[1];
    if (confirm('Cookies found. Do you want to delete them?')) {
      document.cookie = 'divisors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      alert('Cookies deleted. Form reset.');
      location.reload();
    } else {
      alert('Cookies are still available. Please reload the page if necessary.');
    }
  } else {
    alert('No cookies found. Please enter a number to calculate divisors.');
  }
}

// 4
function alignBlocks() {
  // Задаємо вирівнювання по правому краю для block2 і block4
  document.querySelector('.block2').style.textAlign = 'right';
  document.querySelector('.block4').style.textAlign = 'right';

  localStorage.setItem('block2Alignment', 'right');
  localStorage.setItem('block4Alignment', 'right');
}

function restoreAlignment() {
  if (localStorage.getItem('block2Alignment') === 'right') {
    document.querySelector('.block2').style.textAlign = 'right';
  }
  if (localStorage.getItem('block4Alignment') === 'right') {
    document.querySelector('.block4').style.textAlign = 'right';
  }
}

function setupAlignmentTrigger() {
  const blocks = document.querySelectorAll('.block2, .block4');
  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      alignBlocks();});
  });
}

// 5
function createListUI() {
  const block5 = document.querySelector('.block5');
  block5.innerHTML = `
        <div>
            <input type="text" class="list-input" placeholder="Enter list item" />
            <button class="btn-add" onclick="addListItem()">Add Item</button>
            <button class="btn-save" onclick="saveListToLocalStorage()">Save List</button>
            <button class="btn-clr" onclick="clearList()">Clear List</button>
        </div>
        <ul class="dynamic-list"></ul>
    `;
  loadListFromLocalStorage();
}

function addListItem() {
  const inputField = document.querySelector('.list-input');
  const list = document.querySelector('.dynamic-list');
  if (inputField.value.trim() !== "") {
    const listItem = document.createElement('li');
    listItem.textContent = inputField.value.trim();
    list.appendChild(listItem);
    inputField.value = "";
  }
  else {
    alert("Please enter a valid item.");
  }
}

function saveListToLocalStorage() {
  const listItems = document.querySelectorAll('.dynamic-list li');
  const items = Array.from(listItems).map(item => item.textContent);
  localStorage.setItem('listItems', JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const savedItems = JSON.parse(localStorage.getItem('listItems')) || [];
  const list = document.querySelector('.dynamic-list');
  savedItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

function clearList() {
  localStorage.removeItem('listItems');
  document.querySelector('.dynamic-list').innerHTML = '';
}


document.addEventListener('DOMContentLoaded', () => {
  const block5 = document.querySelector('.block5');
  if (localStorage.getItem('listItems')) {
    createListUI();
  }
});

document.querySelector('.btn-crt').addEventListener('click', createListUI);



checkCookies()
//localStorage.clear();

const R1 = 10
const R2 = 20

calculateOvalArea(R1, R2)

setupAlignmentTrigger()
restoreAlignment();

addListItem()
loadListFromLocalStorage();
