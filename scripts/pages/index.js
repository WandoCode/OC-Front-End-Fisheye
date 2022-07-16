async function getPhotographers() {
  try {
    const reponse = await fetch("../../data/photographers.json");
    const datas = await reponse.json();
    const photographers = datas.photographers;

    return photographers;
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  console.log(photographers);

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
