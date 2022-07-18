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
function displayTotalLikes(mediasData) {
  const totalLikes = getTotalLikes(mediasData);
  console.log(totalLikes);
}

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
  displayTotalLikes(photographerDatas.medias);
}

init();
