// Retrieve datas from DB
async function getPhotographerDatas(photographerId) {
  const reponse = await fetch("../../data/photographers.json");
  const datas = await reponse.json();

  // Get the given photographer entry in DB
  const photographers = datas.photographers;
  const photographer = photographers.find((photographer) => {
    return photographer.id === parseInt(photographerId);
  });

  // Get the given photographer medias entries in DB
  const mediasDatas = datas.media;
  const medias = mediasDatas.filter((media) => {
    return media.photographerId === parseInt(photographerId);
  });

  return { photographer, medias };
}

// Display photographer header
function displayPhotographerCard(photographer) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographer);

  const photographerDetails = photographerModel.getUserDetailsDOM();
  const photographerImg = photographerModel.getUserPictureDOM();

  photographHeader.prepend(photographerDetails);
  photographHeader.append(photographerImg);
}

// Display medias in media gallery
function displayMediaCards(photographer, medias) {
  const gallery = document.querySelector(".gallery");

  medias.forEach((media) => {
    const mediasModel = mediaFactory(media, photographer.name);
    mediaCard = mediasModel.getCardDOM();
    gallery.append(mediaCard);
  });
}

// Display total nbr of likes and price for the photographer
// TODO: passer ca dans la factory photographer
function displayNbrDetails(photographerDatas) {
  const main = document.querySelector("main");
  const totalLikes = getTotalLikes(photographerDatas.medias);

  const priceContainer = document.createElement("p");

  const priceText = `${photographerDatas.photographer.price}€ / jour`;
  priceContainer.textContent = priceText;

  const notch = document.createElement("div");
  notch.classList.add("notch");

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
// TODO: passer ca dans la factory photographer
function getTotalLikes(mediasData) {
  let initialValue = 0;

  const total = mediasData.reduce((sum, media) => {
    return sum + parseInt(media.likes);
  }, initialValue);

  return total;
}

// Sort the medias array following the given parameter
function sortMedias(value, medias, defaultValue) {
  switch (value) {
    case "title":
      medias.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });
      break;

    case "date":
      medias.sort((a, b) => {
        return new Date(a.date) > new Date(b.date) ? 1 : -1;
      });
      break;

    case "popularity":
      medias.sort((a, b) => {
        return a.likes - b.likes;
      });
      break;

    default:
      break;
  }
}

// Handle display of sorted medias
function handleSort(value, photographerDatas) {
  console.log(value);
  // Sort medias
  sortMedias(value, photographerDatas.medias);

  // Rerender
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
}

async function init() {
  // Get photgrapher id form url
  const urlParams = new URL(document.location).searchParams;
  const photographerID = urlParams.get("id");

  // Get datas from DB
  const photographerDatas = await getPhotographerDatas(photographerID);

  // Initial sorting of medias
  sortMedias(0, photographerDatas.medias, "popularity");

  // Display page
  displayPhotographerCard(photographerDatas.photographer);
  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
  displayNbrDetails(photographerDatas);

  // Listen for change of sorting value
  const selecMenuModel = displaySelectMenu();
  selecMenuModel.initMenu();
  selecMenuModel.monitorSortingValue((value) => {
    handleSort(value, photographerDatas);
  });
}

init();
