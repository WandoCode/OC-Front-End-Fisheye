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
  const body = document.querySelector("body");
  body.classList.remove("no-scroll");

  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", false);

  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", true);
};

/* Open lightbox */
const displayLightbox = () => {
  const body = document.querySelector("body");
  body.classList.add("no-scroll");

  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", true);

  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  lightbox.setAttribute("aria-hidden", false);
  lightbox.focus();
};

/* Load the media on screen */
const displayMedia = (media, photographerName) => {
  const mediaContainer = document.querySelector(".media-container");

  // Remove precedent picture if present
  mediaContainer.innerHTML = "";

  // Get node from factory
  const mediaModel = mediaFactory(media, photographerName);
  mediaContainer.append(mediaModel.getMediaDOM(true));

  // Add media name
  const mediaName = document.querySelector(".media-name");
  mediaName.textContent = media.title;
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

/* Initialize mouse navigation events */
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

/* Initialize keyboard navigation events */
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

  const closeBtn = document.getElementById("close-lightbox");
  closeBtn.addEventListener("keydown", (e) => {
    const keyValue = e.key;
    if (keyValue === "Enter") closeLightbox();
  });

  const prevBtn = document.getElementById("prev-lightbox");
  prevBtn.addEventListener("keydown", (e) => {
    const keyValue = e.key;
    if (keyValue === "Enter") showNextMedia(mediaNavigation, photographerName);
  });

  const nextBtn = document.getElementById("next-lightbox");
  nextBtn.addEventListener("keydown", (e) => {
    const keyValue = e.key;
    if (keyValue === "Enter") showPrevMedia(mediaNavigation, photographerName);
  });
};
