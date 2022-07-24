/* DOM node */
const closeBtn = document.querySelector(".close-lightbox");
const nextMediaBtn = document.querySelector(".next-media");
const prevMediaBtn = document.querySelector(".prev-media");
const lightbox = document.querySelector(".lightbox");
const mediaContainer = document.querySelector(".media-container");

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
  nextMediaBtn.addEventListener("click", () =>
    showNextMedia(lightboxMediaNavigationModel, photographerName)
  );
  prevMediaBtn.addEventListener("click", () =>
    showPrevMedia(lightboxMediaNavigationModel, photographerName)
  );
  closeBtn.addEventListener("click", () => closeLightbox());
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
  lightbox.style.display = "none";
};

/* Open lightbox */
const displayLightbox = () => {
  lightbox.style.display = "block";
};

/* Load the media on screen */
const displayMedia = (media, photographerName) => {
  // Remove precedent picture if present
  mediaContainer.innerHTML = "";

  const mediaModel = mediaFactory(media, photographerName);
  mediaContainer.append(mediaModel.getMediaDOM());
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
