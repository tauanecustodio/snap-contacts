// --------- variables declaration ---------

let contactIdDelete = null;
let contactIdEdit = null;
let idCounter = 3;
let contactsList = [
  { id: 0, name: "Polícia", tel: "190", email: "" },
  { id: 1, name: "Bombeiros", tel: "193", email: "" },
  { id: 2, name: "Ambulância", tel: "192", email: "" }
];

// main buttons
const addContactBtn = document.getElementById('add-btn');

// modal
const modalDeleteContacts = document.getElementById('modal-delete-contacts');
const closeModalDeleteBtn = document.querySelector('.modal__cancel-delete');
const deleteContactModalBtn = document.querySelector('.modal__delete');

const modalAddContacts = document.getElementById('modal-add-contacts');
const closeModalAddBtn = document.querySelector('.modal__cancel-add');
const addContactModalBtn = document.querySelector('.modal__add');

// form
const formAddContacts = document.getElementById('form-add-contacts');
const errorMessage = document.getElementById('error-message');
const [inputName, inputTel, inputEmail] = [
  'name-input', 'tel-input', 'email-input'
].map(id => document.getElementById(id));

// table
const tableBody = document.getElementById('contacts-table-body');
const totalContacts = document.getElementById('total-contacts');

// --------- function declarations ---------

function modalAddToggle() {
  modalAddContacts.classList.toggle('hide');
  addContactModalBtn.textContent = contactIdEdit === null ? 'Adicionar' : 'Editar';
}

function modalDeleteToggle() {
  modalDeleteContacts.classList.toggle('hide');
}

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

function updateTable() {
  tableBody.innerHTML = '';
  let contactListSort = contactsList.sort((a, b) => a.name.localeCompare(b.name));

  contactListSort.forEach(contact => {
    addContactToTable(contact.id, contact.name, contact.tel, contact.email);
  });

  addEditAndDeleteButtonEvents();
}

function addContactToTable(id, name, tel, email) {
  const row = document.createElement('tr');
  
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  
  const telCell = document.createElement('td');
  telCell.textContent = tel;
  
  const emailCell = document.createElement('td');
  emailCell.textContent = email;
  
  const optionsCell = document.createElement('td');
  optionsCell.innerHTML = `
    <button data-id="${id}" class="edit-btn options-btn" title="Editar contato"><i class="fa-solid fa-pen"></i></button>
    <button data-id="${id}" class="delete-btn options-btn" title="Excluir contato"><i class="fa-solid fa-trash-can"></i></button>
  `;
  
  row.appendChild(nameCell);
  row.appendChild(telCell);
  row.appendChild(emailCell);
  row.appendChild(optionsCell);
  
  tableBody.appendChild(row);
}

function updateContactsList(id, name, tel, email) {
  const contact = {
    id,
    name,
    tel,
    email,
  };

  if (contactIdEdit === null) {
    // Add new contact
    contactsList.push(contact);
  } else {
    // Edit existing contact
    const index = contactsList.findIndex(contact => contact.id === contactIdEdit);
    contactsList[index] = { id: contactIdEdit, name, tel, email };
    contactIdEdit = null;
  }
}

function updateTotalContacts() {
  totalContacts.textContent = `${contactsList.length} contatos`;
}

function clearErrorMessage() {
  errorMessage.textContent = '';
}

function clearForm() {
  inputName.value = '';
  inputTel.value = '';
  inputEmail.value = '';
  clearErrorMessage();
}

function addEditAndDeleteButtonEvents() {
  const editBtns = document.querySelectorAll(".edit-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  
  editBtns.forEach(button => {
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
  
  deleteBtns.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      modalDeleteToggle();
      contactIdDelete = parseInt(this.getAttribute("data-id"));
    });
  });
}

// --------- event listeners ---------

updateTable();
updateTotalContacts();

closeModalDeleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalDeleteToggle();
});

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

// Clear error message when typing in input
inputName.addEventListener('input', clearErrorMessage);
inputTel.addEventListener('input', clearErrorMessage);
inputEmail.addEventListener('input', clearErrorMessage);

deleteContactModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contactsList = contactsList.filter(contact => contact.id !== contactIdDelete);

  modalDeleteToggle();
  updateTable();
  updateTotalContacts();
});
