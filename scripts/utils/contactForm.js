const initModal = (name) => {
  // Modal dynamic content
  fillPhotographerName(name);

  // Handle modal opening
  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", displayModal);

  //Handle modal subission
  const btnSubmit = document.querySelector("#form-submit");
  btnSubmit.addEventListener("click", handleModalSubmission);
};

/* Show modal on screen */
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

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

  console.log(formValues);
};
