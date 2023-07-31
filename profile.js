//this is function to save user data to LocalStorage
function saveUserDataToLocalStorage(UserData) {
  const userDataJSON = JSON.stringify(UserData);
  localStorage.setItem('user', userDataJSON);
}

// this is function to get user data from LocalStorage
function getUserDataFromLocalStorage() {
  const userDataJSON = localStorage.getItem('user');
  if (userDataJSON) {
    return JSON.parse(userDataJSON);
  } else {
    return null;
  }
}
// this is main function witch wait on DOMContent load
document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('profile_form');
  const userDataSection = document.getElementById('user_data');
// this function check does user exist in localStorage and display info if user exist
  function checkUser() {
    const userData = getUserDataFromLocalStorage();
    if (userData) {
      display(userData);
      displayWelcomeMessage();
    } else {
      displayForm();
    }
  }
   function display(userData) {
    const editProfileWrapper = document.getElementById('profile_wrapper');
    if (editProfileWrapper) {
      editProfileWrapper.remove();
    }
    userForm.classList.add('hide');
    userDataSection.classList.remove('hide');
    userDataSection.classList.add('show');

// Display user profile data after input and submit
    const selectUserName = document.getElementById('display_user_name');
    const selectUserName2 = document.querySelectorAll('.profile');
    const selectEmail = document.getElementById('display_email');
    const selectAge = document.getElementById('display_age');
    const selectOccupation = document.getElementById('display_occupation');
    const selectEmployedStatus = document.getElementById('display_employed_status');
    const selectMonthlyIncome = document.getElementById('display_monthly_income');
    const selectKids = document.getElementById('display_number_of_kids');
    const selectMarriageStatus = document.getElementById('display_marriage_status');
    const selectDateOfBirth = document.getElementById('display_date_of_birth');
    selectUserName.textContent = `User Name: ${userData.username}`;
    selectEmail.textContent = `Email: ${userData.email}`;
    selectAge.textContent = `Age: ${userData.age}`;
    selectOccupation.textContent = `Occupation: ${userData.occupation}`;
    selectEmployedStatus.textContent = `Employed status: ${userData.employedStatus}`;
    selectMonthlyIncome.textContent = `Monthly income: ${userData.monthlyIncome}`;
    selectKids.textContent = `Number of kids: ${userData.kids}`;
    selectMarriageStatus.textContent = `Marriage status: ${userData.marriageStatus}`;
    selectDateOfBirth.textContent = `Date of Birth: ${userData.dateOfBirth}`;
    console.log(selectUserName2)
    selectUserName2.forEach((element) => {
        element.textContent = userData.username;
    })
  }
  function displayWelcomeMessage() {
    const afterProfileWrapper = document.getElementsByClassName('after_edit_profile_wrapper')[0];
    const list = `
        <h2>Congratulations! You have successfully created your profile and unlocked exclusive benefits. Welcome to our community! Here's what you can do now:'</h2>
        <ul>
            <li>Personalize Your Experience: Enjoy a customized experience tailored just for you.</li>
            <li>Access Premium Content: Gain access to premium articles, videos, and resources.</li>
            <li>Receive Special Offers and Discounts: Get exclusive offers and discounts on our products and services.</li>
            <li>Stay Updated with the Latest News: Stay informed with the latest news and updates.</li>
        </ul>
        <p>Thank you for joining us. We hope you have a wonderful experience on our platform!</p>
    `;

    afterProfileWrapper.innerHTML = list;
    afterProfileWrapper.classList.add('after_user_info_wrapper_class');
  }

  function displayForm() {
    const editProfileWrapper = document.getElementById('profile_wrapper');
    if (editProfileWrapper) {
      editProfileWrapper.remove();
    }
    userForm.classList.remove('hide');
    userDataSection.classList.remove('show');
    userDataSection.classList.add('hide');
  }

  const btnReverse = document.getElementById('edit_profile');
  if (btnReverse){
    btnReverse.addEventListener('click', function() {
      const userData = getUserDataFromLocalStorage();
      if (userData) {
        displayForm();
        userForm.elements.username.value = userData.username;
        userForm.elements.email.value = userData.email;
        userForm.elements.age.value = userData.age;
        userForm.elements.occupation.value = userData.occupation;
        userForm.elements.employedStatus.value = userData.employedStatus;
        userForm.elements.monthlyIncome.value = userData.monthlyIncome;
        userForm.elements.kids.value = userData.kids;
        userForm.elements.marriageStatus.value = userData.marriageStatus;
        userForm.elements.dateOfBirth.value = userData.dateOfBirth;
      }
    });
  }
  
// this is user object constructor for localStorage 
  class User {
    constructor(username, email, age, occupation, employedStatus, monthlyIncome, kids, marriageStatus, dateOfBirth) {
      this.username = username;
      this.email = email;
      this.age = age;
      this.occupation = occupation;
      this.employedStatus = employedStatus;
      this.monthlyIncome = monthlyIncome;
      this.kids = kids;
      this.marriageStatus = marriageStatus;
      this.dateOfBirth = dateOfBirth;
    }
  }
// this is user form profile creator
  userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = userForm.elements.username.value;
    const email = userForm.elements.email.value;
    const age = userForm.elements.age.value;
    const occupation = userForm.elements.occupation.value;
    const employedStatus = userForm.elements.employedStatus.value;
    const monthlyIncome = userForm.elements.monthlyIncome.value;
    const kids = userForm.elements.kids.value;
    const marriageStatus = userForm.elements.marriageStatus.value;
    const dateOfBirth = userForm.elements.dateOfBirth.value;


    const newUser = new User(
      userName,
      email,
      age,
      occupation,
      employedStatus,
      monthlyIncome,
      kids,
      marriageStatus,
      dateOfBirth
    );

    saveUserDataToLocalStorage(newUser);
    display(newUser);
    displayWelcomeMessage();
  });

  checkUser();
});


