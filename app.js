// Getting elements
const form = document.querySelector('.form-container');
const groceryInput = document.querySelector('.grocery-input');
const groceryList = document.querySelector('.all-items');
const clearAllBtn = document.querySelector('.clear-btn');
const notifMsg = document.querySelector('.notif-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (groceryInput.value) {
        handleInput();
        groceryInput.value = '';
    } else {
        sendNotifMsg("alert-msg", "Please type a valid input", 2000);
    }
});

// On setup, display items that are stored locally
window.addEventListener("DOMContentLoaded", loadLocalStorageList);

function handleInput() {
    // Get input value
    const value = groceryInput.value;
    // Create ID to new item
    const id = new Date().getTime().toString();
    // Create DIV
    createGroceryItem(id, value);
    addToLocalStorage(id, value);
};

function clearList() {
    const itemsList = document.querySelectorAll('.grocery-item');
    for (let item of itemsList) {
        item.remove();
    };
    localStorage.removeItem('list');
    sendNotifMsg("alert-msg", "List cleared", 1500);
};

function removeItem(e) {
    console.log('activated')
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.id;
    removeFromLocalStorage(id);
    element.remove();
    sendNotifMsg("alert-msg", "Item removed", 1500);
};

function sendNotifMsg (className, msg, timer) {
    notifMsg.style.color = 'black';
    notifMsg.classList.add(className);
    notifMsg.innerHTML = msg;
    setTimeout( () => {
        notifMsg.classList.remove(className);
        notifMsg.style.color = 'transparent';
    }, timer);
}

// Add items to local storage
function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorageList();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));

}

// Get local storage data
function getLocalStorageList() {
    return localStorage.getItem('list') ?JSON.parse(localStorage.getItem('list')) : [];
}

// Remove item from local storage
function removeFromLocalStorage(id) {
    let items = getLocalStorageList();
    items = items.filter((item) => {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function loadLocalStorageList() {
    let items = getLocalStorageList();
    if (items.length > 0) {
        items.forEach((item) => {
            createGroceryItem(item.id, item.value);
        })
    }
}

function createGroceryItem(id, value) {
    const newItem = document.createElement('div');
    // Add class
    newItem.classList.add('grocery-item');
    // Add id to new item
    newItem.setAttribute('id', id);
    // Add HTML sequence to newItem
    newItem.innerHTML = ` <p>${value}</p>
    <div class="btns-container">
        <button class="remove-btn">
            <a class="fas fa-delete">
                <img src="./images/delete-icon.png" alt="remove icon">
            </a>
        </button> 
    </div>`;
    // Append newItem as child of groceryList
    groceryList.appendChild(newItem);
    // Access to buttons can happen only here
    // Has to use querySelectorAll otherwise only the first element found will have the eventListener applied
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach((item) => {
        item.addEventListener('click', removeItem);
    });
}