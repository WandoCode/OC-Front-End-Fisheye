const initModal = (name) => {
  // Modal dynamic content
  fillPhotographerName(name);

  // Handle modal opening
  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", displayModal);

  //Handle modal subission
  const btnSubmit = document.querySelector("#form-submit");
  btnSubmit.addEventListener("click", handleModalSubmission);

  // Handle modal closing
  const btnClose = document.querySelector(".contact-close");
  btnClose.addEventListener("click", closeModal);

  // Handle modal keyboard navigation
  const modal = document.getElementById("contact_modal");
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
};

/* Show modal on screen */
function displayModal() {
  const body = document.querySelector("body");
  body.classList.add("no-scroll");

  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", true);

  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", false);
  modal.focus();
}

/* Remove modal from screen */
function closeModal() {
  const body = document.querySelector("body");
  body.classList.remove("no-scroll");

  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", false);

  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", true);
  modal.style.display = "none";
}

/* Fill photographer name */
const fillPhotographerName = (name) => {
  const nameNode = document.querySelector("#photographer-name");
  nameNode.textContent = name;
};

/* Handle form submission */
const handleModalSubmission = (e) => {
  e.preventDefault();
  const contactForm = document.forms[0];

  const formValues = {
    lastName: contactForm.name.value,
    firstName: contactForm["family-name"].value,
    email: contactForm.email.value,
    message: contactForm.message.value,
  };

  // Process validation
  const validators = [
    validateNames(contactForm.name.value, contactForm.name.name),
    validateNames(
      contactForm["family-name"].value,
      contactForm["family-name"].name
    ),
    validateEmail(contactForm.email.value, contactForm.email.name),
    validateText(contactForm.message.value, contactForm.message.name),
  ];

  // Gets errors from validation
  const errors = validators.filter((validationResult) => {
    return validationResult !== undefined;
  });

  // Form is valid: continue
  if (errors.length == 0) {
    console.log(formValues);
    closeModal();
  }
  // Form is invalid: show error
  else {
    console.error(`Invali field(s): ${errors}`);
  }
};

/* Text input validation */
function validateNames(value, inputName) {
  if (value.length < 2 || isEmpty(value)) return inputName;
}

/* Textarea  validation */
function validateText(value, inputName) {
  if (value.length < 10 || isEmpty(value)) return inputName;
}

//  Validate form email input
function validateEmail(value, inputName) {
  //  Regular expression for an email adress
  const reEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reEmail.test(value) || isEmpty(value)) return inputName;
}

// Check that the given string is empty
function isEmpty(valueStr) {
  if (valueStr === "") return true;
  if (valueStr === undefined) return true;
  if (valueStr.length === 0) return true;

  return false;
}
