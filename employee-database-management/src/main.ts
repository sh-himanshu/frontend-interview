import './style.css';
import data from './data.json';

interface Employee {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  age: number;
  dob: string;
  salary: number;
  address: string;
}

const EMPLOYEES: Employee[] = data;
const form = document.getElementById('add-employee-form') as HTMLFormElement;
const formInputs = document.querySelectorAll<HTMLInputElement>('#add-employee-form input');
const modal = document.getElementById('add-employee-dialog') as HTMLDivElement;
const addEmployeeBtn = document.getElementById('add-employee-btn') as HTMLButtonElement;
const contentContainer = document.getElementById('content-container') as HTMLDivElement;
const employeeList = document.getElementById('employee-list') as HTMLDivElement;
const employeeInformation = document.getElementById('employee-information') as HTMLDivElement;

const hideModal = () => {
  if (!modal.classList.contains('hidden')) modal.classList.add('hidden');
};

const showModal = () => {
  form.reset();
  modal.classList.remove('hidden');
};

const parseNumber = (value: string) => (value === '' ? 0 : parseInt(value, 0));

const addEmployee: HTMLFormElement['onsubmit'] = event => {
  event.preventDefault();

  const employeeData = {
    id: 0,
    imageUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    age: 0,
    dob: '',
    salary: 0,
    address: '',
  };

  formInputs.forEach(input => {
    //@ts-ignore
    employeeData[input.name] = input.type === 'number' ? parseNumber(input.value) : input.value;
  });

  employeeData['id'] = EMPLOYEES[EMPLOYEES.length - 1].id + 1;
  EMPLOYEES.push(employeeData);
  hideModal();
};

form.addEventListener('submit', addEmployee);

addEmployeeBtn.addEventListener('click', showModal);

modal.addEventListener('click', event => {
  if ((event.target as any).id === 'add-employee-dialog') hideModal();
});
