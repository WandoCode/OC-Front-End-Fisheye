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
function displayPhotographerCard(photographerModel, photographer, medias) {
  const photographHeader = document.querySelector(".photograph-header");

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
  // Sort medias
  sortMedias(value, photographerDatas.medias);

  // Rerender
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
}

// Display the notch on screen (price/tot. likes)
function displayNbrDetails(photographerModel, photographer, medias) {
  const main = document.querySelector("main");
  const notch = photographerModel.getNotchDOM();
  main.append(notch);
}

// Initialize photographer page
async function init() {
  // Get photgrapher id form url
  const urlParams = new URL(document.location).searchParams;
  const photographerID = urlParams.get("id");

  // Get photographer datas from DB
  const photographerDatas = await getPhotographerDatas(photographerID);

  // Initial sorting of medias
  sortMedias(0, photographerDatas.medias, "popularity");

  const photographerModel = photographerFactory(
    photographerDatas.photographer,
    photographerDatas.medias
  );

  // Display page
  displayPhotographerCard(
    photographerModel,
    photographerDatas.photographer,
    photographerDatas.medias
  );

  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
  displayNbrDetails(
    photographerModel,
    photographerDatas.photographer,
    photographerDatas.medias
  );

  // Launch select menu logic/listeners
  const selecMenuModel = selectMenu();
  selecMenuModel.initMenu();
  selecMenuModel.monitorSortingValue((value) => {
    // Trigger sorting
    handleSort(value, photographerDatas);
  });
}

init();
