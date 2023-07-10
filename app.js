const form = document.querySelector('.form-container');
const groceryInput = document.querySelector('.grocery-input');
const groceryList = document.querySelector('.all-items');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (groceryInput.value) {
        handleInput();
    } else {
        //sendError();
    }
})

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
}