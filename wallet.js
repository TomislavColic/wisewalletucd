function saveBudgetDataToLocalStorage(userBudgetData){
    const userDataJSON = JSON.stringify(userBudgetData);
    localStorage.setItem('userBudget', userDataJSON)
}
function getBudgetDataFromLocalStorage() {
    const userDataJSON = localStorage.getItem('userBudget');
    return userDataJSON ? JSON.parse(userDataJSON) : null;
  }

// This is constructor with method to push optional user new inputs  
class BudgetData {
    constructor(primaryEmploymentIncome, secondaryEmploymentOrSideHustle, investmentIncome, governmentBenefitsOrAssistance, passiveIncome, expenses = []){
        this.primaryEmploymentIncome = primaryEmploymentIncome;
        this.secondaryEmploymentOrSideHustle = secondaryEmploymentOrSideHustle;
        this.investmentIncome = investmentIncome;
        this.governmentBenefitsOrAssistance = governmentBenefitsOrAssistance;
        this.passiveIncome = passiveIncome;
        this.expenses = []; 
    }
        addOtherIncome(newIncome) {
         this.expenses.push(newIncome);
       }
}

/*
    this part of code cretate new element for user input
    with labeland remove button  and we add class to elements. We use that class to iterate 
    over all inputs in object latter in code (this is not good code but dont know better). 
*/
const btnBudgetAdd = document.getElementById('btn_budget_add');
const elementToAppend = document.getElementById('budget_wrapper');
const incomeForm = document.getElementById('income_form');
const budgetAddName = document.getElementById('budget_add_name');
function addBudgetItem() {
    if (budgetAddName.value === '') {
        alert('name required to add additional income');
        return;
    }
    const newLabel = document.createElement('label');
    const newInput = document.createElement('input');
    const newButton = document.createElement('button');
    newLabel.textContent = budgetAddName.value;
    newLabel.classList.add('append_class_item');
    newInput.classList.add('append_class_list');
    newButton.classList.add('remove_item');
    newButton.textContent = 'Remove';
    elementToAppend.appendChild(newLabel);
    elementToAppend.appendChild(newInput);
    elementToAppend.appendChild(newButton);
    const additionalIncomeInputs = [...document.querySelectorAll('.append_class_list')];
    newButton.addEventListener('click', () => {
        elementToAppend.removeChild(newLabel);
        elementToAppend.removeChild(newInput);
        elementToAppend.removeChild(newButton);
        const index = additionalIncomeInputs.indexOf(newInput);
        if (index !== -1) {
            additionalIncomeInputs.splice(index, 1);
        }
        const userBudget = getBudgetDataFromLocalStorage();
        if (userBudget) {
            userBudget.expenses = additionalIncomeInputs.map(input => input.value.trim());
            saveBudgetDataToLocalStorage(userBudget);
        }
    });

    return budgetAddName.value = '';
}
btnBudgetAdd.addEventListener('click', addBudgetItem);

// This part of code handle submit form and create instance of constructor object

incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const primaryEmploymentIncome = incomeForm.elements.primaryEmploymentIncome.value;
    const secondaryEmploymentOrSideHustle = incomeForm.elements.secondaryEmploymentOrSideHustle.value;
    const investmentIncome = incomeForm.elements.investmentIncome.value;
    const governmentBenefitsOrAssistance = incomeForm.elements.governmentBenefitsOrAssistance.value;
    const passiveIncome = incomeForm.elements.passiveIncome.value;

    const userBudget = new BudgetData(
        primaryEmploymentIncome,
        secondaryEmploymentOrSideHustle,
        investmentIncome,
        governmentBenefitsOrAssistance,
        passiveIncome
    )
// this part of code check if is input empty string and trim spaces and than save in localStorage
    const additionalIncomeInputs = document.querySelectorAll('.append_class_list');
    additionalIncomeInputs.forEach((input) => {
    if (input.value.trim() !== '') {
    userBudget.addOtherIncome(input.value.trim());
  }
 })
 saveBudgetDataToLocalStorage(userBudget);
 displayStoredBudgetData();
})
// func to display data from local storage if data even exist
function displayStoredBudgetData() {
    const userBudget = getBudgetDataFromLocalStorage();
    if (userBudget) {
        const budgetList = document.getElementById('budget_list');
        budgetList.innerHTML = ''; 
    
        const incomeProperties = Object.keys(userBudget);
        for (const prop of incomeProperties) {
            const listItem = document.createElement('li');
            listItem.textContent = `${prop}: ${userBudget[prop]}`;
            budgetList.appendChild(listItem);
        }
    }
}
document.addEventListener('DOMContentLoaded', displayStoredBudgetData);

