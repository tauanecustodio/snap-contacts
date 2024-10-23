// --------- variables declaration ---------

const contactsList = [];

// main buttons
const addContactBtn = document.getElementById('add-btn');

// modal
const modalAddContacts = document.getElementById('modal__add-contacts');
const closeModalBtn = document.querySelector('.modal__cancel');
const addContactModalBtn = document.querySelector('.modal__add');

// form
const formAddContacts = document.getElementById('form-add-contacts');
const inputName = document.getElementById('name-input');
const inputTel = document.getElementById('tel-input');
const inputEmail = document.getElementById('email-input');
const errorMessage = document.getElementById('error-message');

// table
const tableBody = document.getElementById('contacts-table-body');
const totalContacts = document.getElementById('total-contacts');

// --------- function declarations ---------

function modalToggle() {
  modalAddContacts.classList.toggle('hide');
}

function validateForm(name, tel, email) {
  let message;
  const telRegex = /^[0-9]{9,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!name) {
    message = "Preencha o nome do contato";
  } else if(!tel) {
    message = "Preencha o telefone do contato";
  } else if (tel && !telRegex.test(tel)) {
    message = "O telefone deve ter pelo menos 9 dígitos numéricos.";
  } else if (email && !emailRegex.test(email)) {
    message = "Formato de e-mail inválido.";
  } else {
    message = true;
  }
  return message
}

function addContactToTable(name, tel, email) {
  const row = document.createElement('tr');
  
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  
  const telCell = document.createElement('td');
  telCell.textContent = tel;
  
  const emailCell = document.createElement('td');
  emailCell.textContent = email;
  
  row.appendChild(nameCell);
  row.appendChild(telCell);
  row.appendChild(emailCell);
  
  tableBody.appendChild(row);
}

function updateContactsList(name, tel, email) {
  const contact = {
    name,
    tel,
    email,
  };

  contactsList.push(contact);
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

// --------- event listeners ---------

addContactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalToggle();
})

closeModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalToggle();
})

formAddContacts.addEventListener('submit',  function(e) {
  e.preventDefault();
  
  const name = inputName.value;
  const tel = inputTel.value;
  const email = inputEmail.value;

  const validationResult = validateForm(name, tel, email);
  
  if(validationResult !== true) {
    errorMessage.textContent = validationResult;
    return;
  }
  
  addContactToTable(name, tel, email);
  updateContactsList(name, tel, email);
  updateTotalContacts();

  clearForm();

  modalToggle();
})

// clear error message when typing in input
inputName.addEventListener('input', clearErrorMessage)
inputTel.addEventListener('input', clearErrorMessage);
inputEmail.addEventListener('input', clearErrorMessage);