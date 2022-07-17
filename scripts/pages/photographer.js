async function getPhotographerData(photographerId) {}
async function init() {
  const urlParams = new URL(document.location).searchParams;
  const photographerID = urlParams.get("id");
}

init();
