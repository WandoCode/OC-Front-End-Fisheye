async function getPhotographerDatas(photographerId) {
  const reponse = await fetch("../../data/photographers.json");
  const datas = await reponse.json();

  // Get the given photographer user entry in DB
  const photographers = datas.photographers;
  const photographer = photographers.find((photographer) => {
    return photographer.id === parseInt(photographerId);
  });

  // Get the given photographer media entries in DB
  const mediasDatas = datas.media;
  const medias = mediasDatas.filter((media) => {
    return media.photographerId === parseInt(photographerId);
  });

  return { photographer, medias };
}

function displayMediaCards(photographerDatas, sorting) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographerDatas.photographer);

  const photographerDetails = photographerModel.getUserDetailsDOM();
  const photographerImg = photographerModel.getUserPictureDOM();

  photographHeader.prepend(photographerDetails);
  photographHeader.append(photographerImg);

  // TODO: apply sorting on photographerDatas.medias before rendering using 'sorting' function parameter
  const mediasSection = document.querySelector(".medias-section");
  photographerDatas.medias.forEach((media) => {
    const mediasModel = mediaFactory(
      media,
      photographerDatas.photographer.name
    );
    mediaCard = mediasModel.getMediaCardDOM();
    mediasSection.append(mediaCard);
  });
}

// Display total nbr of likes and price for the photographer
function displayNbrDetails(photographerDatas) {
  const main = document.querySelector("main");
  const totalLikes = getTotalLikes(photographerDatas.medias);
  console.log(totalLikes);

  const priceContainer = document.createElement("p");

  const priceText = `${photographerDatas.photographer.price}€ / jour`;
  priceContainer.textContent = priceText;

  const notch = document.createElement("div");

  const likesContainer = document.createElement("p");

  const nbrLikes = document.createElement("span");
  nbrLikes.textContent = `${totalLikes}`;

  const icon = document.createElement("i");
  icon.classList.add("fa-heart");
  icon.classList.add("fa-solid");

  main.append(notch);

  notch.append(likesContainer);
  notch.append(priceContainer);

  likesContainer.append(nbrLikes);
  likesContainer.append(icon);
}

// Calcul the total number of likes for the photographer
function getTotalLikes(mediasData) {
  let initialValue = 0;
  const total = mediasData.reduce((sum, media) => {
    return sum + parseInt(media.likes);
  }, initialValue);
  return total;
}

async function init() {
  const urlParams = new URL(document.location).searchParams;
  const photographerID = urlParams.get("id");

  const photographerDatas = await getPhotographerDatas(photographerID);
  displayMediaCards(photographerDatas);
  displayNbrDetails(photographerDatas);
}

init();
