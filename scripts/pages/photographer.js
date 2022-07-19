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
function displayPhotographerCard(photographer) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographer);

  const photographerDetails = photographerModel.getUserDetailsDOM();
  const photographerImg = photographerModel.getUserPictureDOM();

  photographHeader.prepend(photographerDetails);
  photographHeader.append(photographerImg);
}

function displayMediaCards(photographer, medias) {
  const gallery = document.querySelector(".gallery");

  medias.forEach((media) => {
    const mediasModel = mediaFactory(media, photographer.name);
    mediaCard = mediasModel.getMediaCardDOM();
    gallery.append(mediaCard);
  });
}

// Display total nbr of likes and price for the photographer
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
function getTotalLikes(mediasData) {
  let initialValue = 0;
  const total = mediasData.reduce((sum, media) => {
    return sum + parseInt(media.likes);
  }, initialValue);
  return total;
}

// Sort the medias array following the given parameter
function sortMedias(e, medias, defaultValue) {
  const value = defaultValue ? defaultValue : e.target.value;

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
        console.log(1);
        return a.likes - b.likes;
      });
      break;

    default:
      break;
  }
}
function handleSort(e, photographerDatas) {
  sortMedias(e, photographerDatas.medias);

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
}

async function init() {
  const urlParams = new URL(document.location).searchParams;

  const photographerID = urlParams.get("id");

  const photographerDatas = await getPhotographerDatas(photographerID);
  sortMedias(0, photographerDatas.medias, "popularity");

  displayPhotographerCard(photographerDatas.photographer);
  displayMediaCards(photographerDatas.photographer, photographerDatas.medias);
  displayNbrDetails(photographerDatas);

  const select = document.querySelector("#sorting-gallery");
  select.addEventListener("change", (e) => handleSort(e, photographerDatas));
}

init();
