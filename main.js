function getUserDataFromLocalStorage() {
    const userDataJSON = localStorage.getItem('user');
    if (userDataJSON) {
      return JSON.parse(userDataJSON);
    } else {
      return null;
    }
  }
const userData = getUserDataFromLocalStorage();
console.log(userData)  
const selectAllUserName = document.querySelectorAll('.profile');
selectAllUserName.forEach((name) =>{
    name.textContent = userData.username;
})
// function generateRandomString(length) {
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // let randomString = '';
  // for (let i = 0; i < length; i++) {
    // const randomIndex = Math.floor(Math.random() * characters.length);
    // randomString += characters.charAt(randomIndex);
  // }
  // return randomString;
// }
// const randomId = generateRandomString(8);
// const sliderContainer = document.querySelector('.slider_container');
// const prevButton = document.querySelector('.prev_button');
// const nextButton = document.querySelector('.next_button');
// 
// let slideIndex = 0;
// 
// function showSlide(index) {
  // const slides = document.querySelectorAll('.slider_image');
  // if (index < 0) {
    // slideIndex = slides.length - 1;
  // } else if (index >= slides.length) {
    // slideIndex = 0;
  // }
// 
  // sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
// }
// 
// prevButton.addEventListener('click', () => {
  // showSlide(slideIndex - 1);
// });
// 
// nextButton.addEventListener('click', () => {
  // showSlide(slideIndex + 1);
// });
// 
// function startSlider() {
  // setInterval(() => {
    // showSlide(slideIndex + 1);
  // }, 1000); 
// }
// 
// startSlider();
