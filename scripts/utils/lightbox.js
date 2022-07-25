/* Launch lightbox */
const handleLightbox = (media, medias, photographerName) => {
  // Instance of navigation object
  const lightboxMediaNavigationModel = new LightboxMediaNavigation(
    media,
    medias
  );

  //Display lightbox on screen
  displayLightbox();

  // Add media on lightbox
  displayMedia(media, photographerName);

  // Initialize lightbox buttons
  initButtonsNavigation(lightboxMediaNavigationModel, photographerName);

  // Initialize keyboard navigation
  initKeyboardNavigation(lightboxMediaNavigationModel, photographerName);
};

/* Object constructor for navigation between medias */
function LightboxMediaNavigation(media, medias) {
  /* Compute current media index at object instance creation */
  this.currentMediaIndex = (() => {
    return medias.findIndex((a) => {
      return a.id === media.id;
    });
  })();

  /* Return the next media in the array */
  this.nextMedia = () => {
    const nextIndex = (this.currentMediaIndex + 1) % medias.length;
    this.currentMediaIndex = nextIndex;
    return medias.at(nextIndex);
  };

  /* Return the previous media in the array */
  this.prevMedia = () => {
    const prevIndex = (this.currentMediaIndex - 1) % medias.length;
    this.currentMediaIndex = prevIndex;
    return medias.at(prevIndex);
  };
}

/* Close lightbox */
const closeLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
};

/* Open lightbox */
const displayLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  lightbox.focus();
};

/* Load the media on screen */
const displayMedia = (media, photographerName) => {
  const mediaContainer = document.querySelector(".media-container");

  // Remove precedent picture if present
  mediaContainer.innerHTML = "";

  const mediaModel = mediaFactory(media, photographerName);
  mediaContainer.append(mediaModel.getMediaDOM(true));
};

/* Load next media on screen */
const showNextMedia = (mediaNavigation, photographerName) => {
  const newMedia = mediaNavigation.nextMedia();
  displayMedia(newMedia, photographerName);
};

/* Load previous media on screen */
const showPrevMedia = (mediaNavigation, photographerName) => {
  const newMedia = mediaNavigation.prevMedia();
  displayMedia(newMedia, photographerName);
};

const initButtonsNavigation = (mediaNavigation, photographerName) => {
  const nextMediaBtn = document.querySelector(".next-media");
  nextMediaBtn.addEventListener("click", () =>
    showNextMedia(mediaNavigation, photographerName)
  );

  const prevMediaBtn = document.querySelector(".prev-media");
  prevMediaBtn.addEventListener("click", () =>
    showPrevMedia(mediaNavigation, photographerName)
  );

  const closeBtn = document.querySelector(".close-lightbox");
  closeBtn.addEventListener("click", () => closeLightbox());
};

const initKeyboardNavigation = (mediaNavigation, photographerName) => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.addEventListener("keydown", (e) => {
    const keyValue = e.key;

    if (keyValue === "ArrowRight")
      showNextMedia(mediaNavigation, photographerName);
    if (keyValue === "ArrowLeft")
      showPrevMedia(mediaNavigation, photographerName);
    if (keyValue === "Escape") closeLightbox();
  });
};
