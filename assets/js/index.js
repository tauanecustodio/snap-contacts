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

// table
const tableBody = document.getElementById('contacts-table-body');
const totalContacts = document.getElementById('total-contacts');

// --------- function declarations ---------

function modalToggle() {
  modalAddContacts.classList.toggle('hide');
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
  console.log(contactsList);
}

function updateTotalContacts() {
  totalContacts.textContent = `${contactsList.length} contatos`;
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
  
  addContactToTable(name, tel, email);
  updateContactsList(name, tel, email);
  updateTotalContacts();

  modalToggle();
})