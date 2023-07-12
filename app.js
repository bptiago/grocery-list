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

function handleInput() {
    const newItem = document.createElement('div');
    newItem.classList.add('grocery-item');
    // Add HTML sequence to newItem
    newItem.innerHTML = ` <p>${groceryInput.value}</p>
    <div class="btns-container">
        <button class="edit-btn">
            <a class="fas fa-edit">
                <img src="./images/edit-icon.png" alt="edit icon">
            </a>
        </button>
        <button class="remove-btn">
            <a class="fas fa-delete">
                <img src="./images/delete-icon.png" alt="remove icon">
            </a>
        </button> 
    </div>`;
    // Append newItem as child of groceryList
    groceryList.appendChild(newItem);
    // Acess to buttons can happen only here
    const removeBtn = document.querySelector('.remove-btn');
    removeBtn.addEventListener('click', removeItem);
};

function clearList() {
    const itemsList = document.querySelectorAll('.grocery-item');
    for (let item of itemsList) {
        item.remove();
    };
    sendNotifMsg("alert-msg", "List cleared", 1500);
};

function removeItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
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