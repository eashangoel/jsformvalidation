function addListenerMulti(el, s, fn) {
  s.split(" ").forEach((e) => el.addEventListener(e, fn, false));
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let errors = document.getElementsByClassName("error");

let email = document.getElementById("email");
addListenerMulti(email, "input focus", (event) => {
  if (email.value.length === 0) {
    errors[0].textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    errors[0].textContent = "Entered value needs to be an e-mail address.";
  } else if (email.value.length < 8) {
    errors[0].textContent =
      `Email should be at least 8 characters, you have only entered ` +
      email.value.length;
  } else {
    errors[0].textContent = "";
  }
});

let country = document.getElementById("country");
addListenerMulti(country, "input focus", (event) => {
  if (country.value.length === 0) {
    errors[1].textContent = "You need to enter a country.";
  } else if (country.value.length < 2) {
    errors[1].textContent = `Please enter a valid country name`;
  } else {
    errors[1].textContent = "";
  }
});

let zip = document.getElementById("zip");
addListenerMulti(zip, "input focus", (event) => {
  if (zip.value.length === 0) {
    errors[2].textContent = "You need to enter a zipcode.";
  } else if (zip.value.length < 6) {
    errors[2].textContent = "Please enter a valid zipcode";
  } else if (zip.value.length > 6) {
    errors[2].textContent = "Please enter a valid zipcode";
  } else {
    errors[2].textContent = "";
  }
});

let password = document.getElementById("password");
addListenerMulti(password, "input focus", (event) => {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if (password.value.length === 0) {
    errors[3].textContent = "You need to enter a password";
  } else if (password.value.length < 8) {
    errors[3].textContent =
      "Password must be at least 8 characters long, you have entered " +
      password.value.length;
  } else if (!password.value.match(lowerCaseLetters)) {
    errors[3].textContent = "Please enter a lowercase letter";
  } else if (!password.value.match(upperCaseLetters)) {
    errors[3].textContent = "Please enter an uppercase letter";
  } else if (!password.value.match(numbers)) {
    errors[3].textContent = "Please enter a number";
  } else {
    errors[3].textContent = "";
  }
});

let passwordConfirm = document.getElementById("password-confirm");
addListenerMulti(passwordConfirm, "input focus", (event) => {
  if (passwordConfirm.value.length === 0) {
    errors[4].textContent = "You need to enter a password";
  } else if (password.value !== passwordConfirm.value) {
    errors[4].textContent = "Password don't match";
    passwordConfirm.setCustomValidity("Invalid field.");
  } else {
    errors[4].textContent = "";
    passwordConfirm.setCustomValidity("");
  }
});

let container = document.getElementById("container");
let submitButton = document.getElementsByClassName("submit-button");
submitButton[0].addEventListener("click", () => {
  if (
    email.checkValidity() &&
    country.checkValidity() &&
    zip.checkValidity() &&
    password.checkValidity() &&
    passwordConfirm.checkValidity()
  ) {
    alert("You're all validated!");
    container.classList.add("confetti");
  } else {
    container.classList.remove("confetti");
    submitButton[0].classList.add("shake");
    delay(500).then(() => {
      submitButton[0].classList.remove("shake");
    });
  }
});
