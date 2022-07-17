async function getPhotographerDatas(photographerId) {
  const reponse = await fetch("../../data/photographers.json");
  const datas = await reponse.json();

  // Get the given photographer user entry in DB
  const photographers = datas.photographers;
  const photographer = photographers.find((photographer) => {
    return photographer.id === parseInt(photographerId);
  });

  // Get the given photographer medias entry in DB
  const mediasDatas = datas.media;
  const medias = mediasDatas.find((media) => {
    return media.photographerId === parseInt(photographerId);
  });

  return { photographer, medias };
}

function displayData(photographerDatas) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(photographerDatas.photographer);
  const mediasModel = mediaFactory(photographerDatas.medias);

  const photographerDetails = photographerModel.getUserDetailsDOM();
  const photographerImg = photographerModel.getUserPictureDOM();

  photographHeader.prepend(photographerDetails);
  photographHeader.append(photographerImg);

  // TODO: Create media factory and calls it to display in the page here
}

async function init() {
  const urlParams = new URL(document.location).searchParams;
  const photographerID = urlParams.get("id");

  const photographerDatas = await getPhotographerDatas(photographerID);
  displayData(photographerDatas);
}

init();
