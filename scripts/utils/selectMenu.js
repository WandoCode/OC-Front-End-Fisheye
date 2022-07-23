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

        // Affiche le choix dans le boutton;
        btnSelect.textContent = textValue[value];
        // Reactive tout les choix
        const hideOption = document.querySelector(".option-hide");
        hideOption.classList.remove("option-hide");
        // Desactive la valeur choisie des choix possibles
        option.classList.add("option-hide");
        // Ferme le menu
        btnSelect.setAttribute("open", "false");
      });
    });
  }

  // Ecoute le menu select et appel une cb si la valeur choisie change
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
