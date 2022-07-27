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

function closeModal() {
  const body = document.querySelector("body");
  body.classList.remove("no-scroll");

  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", false);

  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", true);
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
  closeModal();
};
