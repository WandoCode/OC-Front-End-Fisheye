const handleLightbox = (media, medias, photographerName) => {
  openLightbox();
  displayMedia(media, photographerName);
};

const closeLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  //TODO: retirer l'image du container qd lightbox fermée
};
const openLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
};

const displayMedia = (media, photographerName) => {
  const lightbox = document.querySelector(".media-container");
  const surname = photographerName.split(" ")[0];

  if (media.image) {
    // Ressemble une partie de création de media card pour la gallerie, mediaFactory => Refactor?
    const img = document.createElement("img");
    img.src = `../../assets/photographers/medias/${surname}/${media.image}`;
    img.alt = media.title;
    lightbox.append(img);
  }
  if (media.video) {
    const videoNode = document.createElement("video");
    videoNode.controls = "true";
    const source = document.createElement("source");
    source.src = `../../assets/photographers/medias/${surname}/${media.video}`;
    source.type = "video/mp4";
    videoNode.append(source);
    lightbox.append(videoNode);
  }
};
