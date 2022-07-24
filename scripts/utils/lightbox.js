/* DOM node */
const closeBtn = document.querySelector(".close-lightbox");
const nextMediaBtn = document.querySelector(".next-media");
const prevMediaBtn = document.querySelector(".prev-media");
const lightbox = document.querySelector(".lightbox");
const mediaContainer = document.querySelector(".media-container");

/* Object constructor for navigation between medias */
function LightboxMediaNavigation(media, medias) {
  this.currentMediaIndex = (() => {
    return medias.findIndex((a) => {
      return a.id === media.id;
    });
  })();

  this.nextMedia = () => {
    const nextIndex = (this.currentMediaIndex + 1) % medias.length;
    const rep = medias.at(nextIndex);
    this.currentMediaIndex = nextIndex;
    return rep;
  };

  this.prevMedia = () => {
    const prevIndex = (this.currentMediaIndex - 1) % medias.length;
    const rep = medias.at(prevIndex);
    this.currentMediaIndex = prevIndex;
    return rep;
  };
}

const closeLightbox = () => {
  lightbox.style.display = "none";
};

const displayLightbox = () => {
  lightbox.style.display = "block";
};

const displayMedia = (media, photographerName) => {
  // Remove precedent picture if present
  mediaContainer.innerHTML = "";

  const surname = photographerName.split(" ")[0];

  if (media.image) {
    // Ressemble une partie de création de media card pour la gallerie, mediaFactory => Refactor?
    const img = document.createElement("img");
    img.src = `../../assets/photographers/medias/${surname}/${media.image}`;
    img.alt = media.title;
    mediaContainer.append(img);
  }
  if (media.video) {
    const videoNode = document.createElement("video");
    videoNode.controls = "true";
    const source = document.createElement("source");
    source.src = `../../assets/photographers/medias/${surname}/${media.video}`;
    source.type = "video/mp4";
    videoNode.append(source);
    mediaContainer.append(videoNode);
  }
};

const showNextMedia = (mediaNavigation, photographerName) => {
  const newMedia = mediaNavigation.nextMedia();
  displayMedia(newMedia, photographerName);
};

const showPrevMedia = (mediaNavigation, photographerName) => {
  const newMedia = mediaNavigation.prevMedia();
  displayMedia(newMedia, photographerName);
};

const initLightbox = (media, medias, photographerName) => {
  // Instance of navigation object
  const lightboxMediaNavigationModel = new LightboxMediaNavigation(
    media,
    medias
  );

  //Display lightbox on screen
  displayLightbox();

  // Add media on lightbox
  displayMedia(media, photographerName);

  // Init next btn
  nextMediaBtn.addEventListener("click", () =>
    showNextMedia(lightboxMediaNavigationModel, photographerName)
  );

  // Init previous btn
  prevMediaBtn.addEventListener("click", () =>
    showPrevMedia(lightboxMediaNavigationModel, photographerName)
  );

  // Init close btn
  closeBtn.addEventListener("click", () => closeLightbox());
};
