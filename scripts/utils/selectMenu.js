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
      const isOpened = btnSelect.getAttribute("open");
      if (isOpened === "true") {
        btnSelect.setAttribute("open", "false");
        btnSelect.setAttribute("aria-expanded", "false");
      } else if (isOpened === "false") {
        btnSelect.setAttribute("open", "true");
        btnSelect.setAttribute("aria-expanded", "true");
      }
    });

    // Handle options selection
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        changeSort(e, option);
      });
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") changeSort(e, option);
      });
    });
  }

  /* Launch listeners for select menu; Execute cb fct when event happens */
  const monitorSortingValue = (cbFct) => {
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        const newValue = e.target.getAttribute("value");
        cbFct(newValue);
      });
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newValue = e.target.getAttribute("value");
          cbFct(newValue);
        }
      });
    });
  };

  function changeSort(e, option) {
    const value = e.target.getAttribute("value");

    // Change the value in btn by the clicked value
    btnSelect.textContent = textValue[value];

    const hideOption = document.querySelector(".option-hide");
    hideOption.classList.remove("option-hide");

    option.classList.add("option-hide");

    // Close menu
    btnSelect.setAttribute("open", "false");
  }

  return { initMenu, monitorSortingValue };
}
