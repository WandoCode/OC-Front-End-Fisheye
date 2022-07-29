// Handle select sorting menu
function selectMenu() {
  const btnSelect = document.getElementById("btn-select");
  const options = document.querySelectorAll(".option");

  const textValue = {
    popularity: "Popularité",
    date: "Date",
    title: "Titre",
  };

  /* Initialize select menu */
  function initMenu() {
    // Handle open/close of menu
    btnSelect.addEventListener("click", (e) => {
      toggleMenuOpening();
    });

    // Handle options selection
    handleOptions();
  }

  // Toggle menu opening
  function toggleMenuOpening() {
    const isOpened = btnSelect.getAttribute("data-open");
    if (isOpened === "true") {
      btnSelect.setAttribute("data-open", "false");
      btnSelect.setAttribute("aria-expanded", "false");
    } else if (isOpened === "false") {
      btnSelect.setAttribute("data-open", "true");
      btnSelect.setAttribute("aria-expanded", "true");
    }
  }

  // Handle options selection
  function handleOptions() {
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        changeSort(e, option);
      });
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") changeSort(e, option);
      });
      option.addEventListener("focus", (e) => {
        btnSelect.setAttribute("aria-activedescendant", option.id);
      });
    });
  }

  /* Launch listeners for select menu; Execute cb fct when event happens */
  const monitorSortingValue = (cbFct) => {
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        const newValue = e.target.getAttribute("data-value");
        cbFct(newValue);
      });
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newValue = e.target.getAttribute("data-value");
          cbFct(newValue);
        }
      });
    });
  };

  /* Change HTML/CSS attribute to follow the chosen sorting */
  function changeSort(e, option) {
    const value = e.target.getAttribute("data-value");

    // Change the value in btn by the clicked value
    btnSelect.textContent = textValue[value];

    // Hide current sort from options
    const hideOption = document.querySelector(".option-hide");
    hideOption.classList.remove("option-hide");
    hideOption.setAttribute("tabindex", "0");

    option.classList.add("option-hide");
    option.removeAttribute("tabindex");

    // Close menu
    btnSelect.setAttribute("data-open", "false");
    btnSelect.setAttribute("aria-activedescendant", option.id);
    btnSelect.focus();
  }

  return { initMenu, monitorSortingValue };
}
