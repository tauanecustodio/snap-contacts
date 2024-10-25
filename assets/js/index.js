// --------- Variables Declaration ---------

let contactIdDelete = null;
let contactIdEdit = null;
let idCounter = 3;
let contactsList = [
  { id: 0, name: "Polícia", tel: "190", email: "" },
  { id: 1, name: "Bombeiros", tel: "193", email: "" },
  { id: 2, name: "Ambulância", tel: "192", email: "" }
];

// Main buttons and modal elements
const addContactBtn = document.getElementById('add-btn');
const modalDeleteContacts = document.getElementById('modal-delete-contacts');
const closeModalDeleteBtn = document.querySelector('.modal__cancel-delete');
const deleteContactModalBtn = document.querySelector('.modal__delete');
const modalAddContacts = document.getElementById('modal-add-contacts');
const closeModalAddBtn = document.querySelector('.modal__cancel-add');
const addContactModalBtn = document.querySelector('.modal__add');

// Form elements
const formAddContacts = document.getElementById('form-add-contacts');
const errorMessage = document.getElementById('error-message');
const [inputName, inputTel, inputEmail] = [
  'name-input', 'tel-input', 'email-input'
].map(id => document.getElementById(id));

// Table and search input
const tableBody = document.getElementById('contacts-table-body');
const totalContacts = document.getElementById('total-contacts');
const searchInput = document.getElementById('search-input');

// --------- Function Declarations ---------

// Toggle modals
function modalAddToggle() {
  modalAddContacts.classList.toggle('hide');
  addContactModalBtn.textContent = contactIdEdit === null ? 'Adicionar' : 'Editar';
}

function modalDeleteToggle() {
  modalDeleteContacts.classList.toggle('hide');
}

// Validate contact form inputs
function validateForm(name, tel, email) {
  let message;
  const telRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    message = "Preencha o nome do contato";
  } else if (contactsList.some(el => el.name === name && el.id !== contactIdEdit)) {
    message = "Já existe um contato com esse nome";
  } else if (!tel) {
    message = "Preencha o telefone do contato";
  } else if (tel && !telRegex.test(tel)) {
    message = "O telefone deve ter apenas dígitos numéricos.";
  } else if (contactsList.some(el => el.tel === tel && el.id !== contactIdEdit)) {
    message = "Já existe um contato com esse número";
  } else if (email && !emailRegex.test(email)) {
    message = "Formato de e-mail inválido.";
  } else if (email !== '' && contactsList.some(el => el.email === email && el.id !== contactIdEdit)) {
    message = "Já existe um contato com esse email";
  } else {
    message = true;
  }
  return message;
}

// Update contacts table display
function updateTable() {
  tableBody.innerHTML = '';
  contactsList.sort((a, b) => a.name.localeCompare(b.name))
              .forEach(contact => addContactToTable(contact.id, contact.name, contact.tel, contact.email));
  addEditAndDeleteButtonEvents();
}

// Add contact to table row
function addContactToTable(id, name, tel, email) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${tel}</td>
    <td>${email}</td>
    <td>
      <button data-id="${id}" class="edit-btn options-btn" title="Editar contato"><i class="fa-solid fa-pen"></i></button>
      <button data-id="${id}" class="delete-btn options-btn" title="Excluir contato"><i class="fa-solid fa-trash-can"></i></button>
    </td>
  `;
  tableBody.appendChild(row);
}

// Update contacts list (add/edit)
function updateContactsList(id, name, tel, email) {
  const contact = { id, name, tel, email };

  if (contactIdEdit === null) {
    contactsList.push(contact);
  } else {
    const index = contactsList.findIndex(contact => contact.id === contactIdEdit);
    contactsList[index] = { id: contactIdEdit, name, tel, email };
    contactIdEdit = null;
  }
}

// Update contacts count
function updateTotalContacts() {
  totalContacts.textContent = `${contactsList.length} contatos`;
}

// Clear error message and form inputs
function clearErrorMessage() { errorMessage.textContent = ''; }
function clearForm() { inputName.value = ''; inputTel.value = ''; inputEmail.value = ''; clearErrorMessage(); }

// Add events for edit and delete buttons
function addEditAndDeleteButtonEvents() {
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      contactIdEdit = parseInt(this.getAttribute("data-id"));
      const contact = contactsList.find(contact => contact.id === contactIdEdit);
      inputName.value = contact.name;
      inputTel.value = contact.tel;
      inputEmail.value = contact.email;
      modalAddToggle();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      contactIdDelete = parseInt(this.getAttribute("data-id"));
      modalDeleteToggle();
    });
  });
}

// Filter and display contacts based on search
function filterContacts(term) {
  const filteredContacts = contactsList.filter(contact =>
    contact.name.toLowerCase().includes(term.toLowerCase()) ||
    contact.tel.includes(term) ||
    contact.email.toLowerCase().includes(term.toLowerCase())
  );
  displayFilteredContacts(filteredContacts);
}

function displayFilteredContacts(filteredContacts) {
  tableBody.innerHTML = '';
  filteredContacts.forEach(contact => addContactToTable(contact.id, contact.name, contact.tel, contact.email));
  addEditAndDeleteButtonEvents();
}

// --------- Event Listeners ---------

updateTable();
updateTotalContacts();

closeModalDeleteBtn.addEventListener('click', modalDeleteToggle);

addContactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contactIdEdit = null;
  clearForm();
  modalAddToggle();
});

closeModalAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalAddToggle();
});

formAddContacts.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = inputName.value;
  const tel = inputTel.value;
  const email = inputEmail.value;

  const validationResult = validateForm(name, tel, email);
  if (validationResult !== true) {
    errorMessage.textContent = validationResult;
    return;
  }

  updateContactsList(contactIdEdit === null ? idCounter++ : contactIdEdit, name, tel, email);
  updateTable();
  updateTotalContacts();
  clearForm();
  modalAddToggle();
});

// Delete contact on modal confirm
deleteContactModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contactsList = contactsList.filter(contact => contact.id !== contactIdDelete);
  modalDeleteToggle();
  updateTable();
  updateTotalContacts();
});

// Filter contacts on search input
searchInput.addEventListener('input', (e) => {
  filterContacts(e.target.value);
});

// Clear error message on input change
[inputName, inputTel, inputEmail].forEach(input => {
  input.addEventListener('input', clearErrorMessage);
});