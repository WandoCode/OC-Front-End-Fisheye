function mediaFactory(media, photographerName) {
  let { title, image, likes } = media;

  // Create the media path in the DB
  function getMediaPath() {
    const surname = photographerName.split(" ")[0];
    const mediaPath = `../../assets/photographers/medias/${surname}/${image}`;
    return mediaPath;
  }

  // Toogle like icon and nbr of likes
  function toggleLike(e) {
    const icon = e.target;

    if (icon.classList.contains("fa-solid")) {
      icon.classList.replace("fa-solid", "fa-regular");
      likes += 1;

      console.log(likes);
      return;
    }
    if (icon.classList.contains("fa-regular")) {
      icon.classList.replace("fa-regular", "fa-solid");
      likes -= 1;
      console.log(likes);

      return;
    }
  }
  // Create a card for a picture media
  function getCardPictureDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = getMediaPath();

    const detailsContainer = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = `${title}`;

    const likesElement = document.createElement("div");
    likesElement.textContent = `${likes}`;

    const likeIcone = document.createElement("i");
    likeIcone.classList.add("fa-solid");
    likeIcone.classList.add("fa-heart");
    likeIcone.onclick = toggleLike;
    // Add image to card
    article.append(img);

    // Add details to card (title, nbr likes)
    article.append(detailsContainer);
    detailsContainer.append(likesElement);
    likesElement.append(likeIcone);
    detailsContainer.append(h2);

    return article;
  }

  // Create a card for a videa media
  function getCardVideoDOM() {
    const article = document.createElement("article");
    article.textContent = "2";
    return article;
  }

  // Generate media card following media type
  function getMediaCardDom() {
    if (media.image) {
      return getCardPictureDOM();
    }
    if (media.video) {
      return getCardVideoDOM();
    }
  }

  return { getMediaCardDom };
}
// TODO: structure des donénes pour les médias à afficher? Les grouper par photographes? Mélanger toute les images de tout le monde dans un fichier commun? Pas d'importance?
