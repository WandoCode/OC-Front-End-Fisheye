/* Initialize photographer page */
async function init() {
  const photographerID = getPhotographerId();

  // Get photographer datas from DB
  const photographerDatas = await getPhotographerDatas(photographerID);

  // Initial sorting of medias
  sortMedias("popularity", photographerDatas.medias);

  const photographerModel = photographerFactory(
    photographerDatas.photographer,
    photographerDatas.medias
  );

  // Display page's elements
  displayNotch(photographerModel);
  displayPhotographerCard(photographerModel);
  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);

  // Launch select menu logic/listeners
  initSelectMenu(photographerDatas);

  // Launch contact logic/listeners
  initModal(photographerDatas.photographer.name);

  // Initialize lightboxes
  initLightboxes(photographerDatas.medias, photographerDatas.photographer.name);
}

/* Get photgrapher id */
const getPhotographerId = () => {
  const urlParams = new URL(document.location).searchParams;

  const userId = urlParams.get("id");
  if (userId) {
    return userId;
  } else {
    throw new Error("No id parameter found in URL");
  }
};

/* Retrieve datas from DB */
async function getPhotographerDatas(photographerId) {
  const reponse = await fetch("data/photographers.json");
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

/* Display photographer header */
function displayPhotographerCard(photographerModel) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerDetails = photographerModel.getUserDetailsDOM();
  const photographerImg = photographerModel.getUserPictureDOM();

  photographHeader.prepend(photographerDetails);
  photographHeader.append(photographerImg);
}

/* Display medias in media gallery */
function displayMediaCards(photographer, medias) {
  const gallery = document.querySelector(".gallery");

  medias.forEach((media) => {
    const mediasModel = mediaFactory(media, photographer.name);
    mediaCard = mediasModel.getCardDOM();
    gallery.append(mediaCard);
  });
}

/* Listen to medias to open dedicated lightbox on demand */
const initLightboxes = (medias, photographerName) => {
  const mediaNodes = document.querySelectorAll(".media");

  mediaNodes.forEach((media) => {
    const mediaID = parseInt(media.getAttribute("data-id"));
    const mediaDatas = medias.find((a) => {
      return a.id === mediaID;
    });

    media.addEventListener("click", () =>
      handleLightbox(mediaDatas, medias, photographerName)
    );

    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter")
        handleLightbox(mediaDatas, medias, photographerName);
    });
  });
};

/* Display the notch on screen (price/tot. likes) */
function displayNotch(photographerModel) {
  const main = document.querySelector("main");
  const notch = photographerModel.getNotchDOM();
  main.append(notch);
}

/* Sort the medias array following the given parameter */
function sortMedias(value, medias) {
  const sorting = {
    title: () =>
      medias.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      }),
    date: () =>
      medias.sort((a, b) => {
        return new Date(a.date) > new Date(b.date) ? 1 : -1;
      }),
    popularity: () =>
      medias.sort((a, b) => {
        return -a.likes + b.likes;
      }),
  };

  sorting[value]();
}

/* Handle sort menu */
const initSelectMenu = (photographerDatas) => {
  const selecMenuModel = selectMenu();

  selecMenuModel.initMenu();
  selecMenuModel.monitorSortingValue((value) => {
    // Trigger sorting
    rerenderMedias(value, photographerDatas);
  });
};

/* Rerender display of sorted medias */
function rerenderMedias(value, photographerDatas) {
  // Sort medias
  sortMedias(value, photographerDatas.medias);

  // Rerender
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
}

init();
