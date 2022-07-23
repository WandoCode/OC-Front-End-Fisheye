// Handle select sorting menu
function selectMenu(defaultValue = "popularity") {
  const btnSelect = document.getElementById("btn-select");
  const options = document.querySelectorAll(".option");

  const textValue = {
    popularity: "Popularité",
    date: "Date",
    title: "Titre",
  };

  function initMenu() {
    // Handle open/close of menu
    btnSelect.addEventListener("click", (e) => {
      const isOpened = btnSelect.getAttribute("open");
      if (isOpened === "true") {
        btnSelect.setAttribute("open", "false");
      } else if (isOpened === "false") {
        btnSelect.setAttribute("open", "true");
      }
    });

    // Handle options selection
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        const value = e.target.getAttribute("value");

        // Display chooice in btn;
        btnSelect.textContent = textValue[value];
        // Reactive all choices
        const hideOption = document.querySelector(".option-hide");
        hideOption.classList.remove("option-hide");
        // disable chosen value from possible choices
        option.classList.add("option-hide");
        // Close menu
        btnSelect.setAttribute("open", "false");
      });
    });
  }

  /* Listen select menu and call a cb following the choosen value */
  const monitorSortingValue = (cbFct) => {
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        const newValue = e.target.getAttribute("value");
        cbFct(newValue);
      });
    });
  };

  return { initMenu, monitorSortingValue };
}
