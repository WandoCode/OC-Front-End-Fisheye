async function getPhotographers() {
  try {
    // Fetch photographers datas from DB
    const reponse = await fetch("data/photographers.json");
    const datas = await reponse.json();
    const photographers = datas.photographers;

    return photographers;
  } catch (error) {
    // Show error on console if any
    console.error(error);
  }
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
