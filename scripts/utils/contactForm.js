function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  console.log("xd");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const handleModal = (name) => {
  // Handle modal opening
  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", handleOpening(name));

  // Handle modal submission

  // Handle modal closing
};

const handleOpening = (name) => {
  displayModal();
  fillPhotographerName(name);
};

const fillPhotographerName = (name) => {
  const nameNode = document.querySelector("#photographer-name");
  nameNode.textContent = name;
};
