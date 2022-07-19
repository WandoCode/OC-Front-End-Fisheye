function mediaFactory(media, photographerName) {
  let { title, image, likes } = media;

  // Generate media card following media type
  function getMediaCardDOM() {
    if (media.image) {
      const illustration = getMediaPath();
      return getCardDOM(illustration);
    }
    if (media.video) {
      const illustration = getVideoThumbnail();
      return getCardDOM(illustration);
    }
  }

  // Create the media path in the DB
  function getMediaPath() {
    const surname = photographerName.split(" ")[0];
    const mediaPath = `../../assets/photographers/medias/${surname}/${image}`;
    return mediaPath;
  }

  // Create a card for a media
  function getCardDOM(illustration) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = illustration;

    const detailsContainer = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = `${title}`;

    const likesElement = createLikeDOM();

    // Add image to the card
    article.append(img);

    // Add details to the card (title, nbr likes)
    article.append(detailsContainer);
    detailsContainer.append(h2);
    detailsContainer.append(likesElement);

    return article;
  }

  // Create the like button for card
  function createLikeDOM() {
    const likeContainer = document.createElement("div");

    const nbrLikes = document.createElement("span");
    nbrLikes.textContent = `${likes}`;

    const iconsContainer = document.createElement("div");

    const iconEmpty = document.createElement("i");
    iconEmpty.classList.add("fa-regular");
    iconEmpty.classList.add("fa-heart");

    const iconFilled = document.createElement("i");
    iconFilled.classList.add("fa-solid");
    iconFilled.classList.add("fa-heart");
    iconFilled.style.display = "none";

    likeContainer.append(nbrLikes);
    likeContainer.append(iconsContainer);

    iconsContainer.append(iconEmpty);
    iconsContainer.append(iconFilled);
    iconsContainer.onclick = toggleLike;

    return likeContainer;
  }

  // Create the thumbnail path in the DB
  function getVideoThumbnail() {
    // TODO: A adapter quand je sais quelles images je dois utiliser ou comment les récupérer directement depuis la video
    const thumbnailPath = `../../assets/images/icon-video.png`;
    return thumbnailPath;
  }

  // Toogle like icon and nbr of likes
  function toggleLike(e) {
    const icon = e.target;
    const iconsArray = icon.parentNode.childNodes;
    const nbrLikes = icon.parentNode.parentNode.childNodes[0];

    // Add or remove a like following the clicked icon
    if (icon.classList.contains("fa-regular")) {
      likes += 1;
      adaptNotch(1);
    } else {
      adaptNotch(-1);
      likes -= 1;
    }

    // Toggle between the empty and filled icon
    iconsArray.forEach((icon) => {
      if (icon.style.display === "none") {
        icon.style.display = "inline-block";
      } else if (icon.style.display !== "none") {
        icon.style.display = "none";
      }
    });
    nbrLikes.textContent = likes;
  }
  return { getMediaCardDOM };
}

// Increase or decrease total nbr of likes displayed in the notch
function adaptNotch(step = +1) {
  const notch = document.querySelector(".notch");
  const likesNotch = notch.childNodes[0].childNodes[0];

  let totLikes = parseInt(likesNotch.textContent);

  totLikes = step == 1 ? totLikes + 1 : totLikes - 1;

  likesNotch.textContent = totLikes;
}
// TODO: structure des donénes pour les médias à afficher? Les grouper par photographes? Mélanger toute les images de tout le monde dans un fichier commun? Pas d'importance?
