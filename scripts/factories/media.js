function mediaFactory(media, photographerName) {
  let { title, image, likes } = media;

  // Create the media path in the DB
  function getMediaPath() {
    const surname = photographerName.split(" ")[0];
    const mediaPath = `../../assets/photographers/medias/${surname}/${image}`;
    return mediaPath;
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
    const nbrLikes = e.target.previousSibling;

    if (icon.classList.contains("fa-regular")) {
      icon.classList.replace("fa-regular", "fa-solid");
      likes += 1;
    } else if (icon.classList.contains("fa-solid")) {
      icon.classList.replace("fa-solid", "fa-regular");
      likes -= 1;
    }
    nbrLikes.textContent = likes;
    //TODO: Faire une fct updateTotalLike qui recalcul le nbr total de like et update la valeur totale (il faut pouvoir communiquer la valeur en dehors de la fct factory quand la velur change, comment?)
  }

  // Create a card for a media
  function getCardDOM(illustration) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = illustration;

    const detailsContainer = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = `${title}`;

    const likesElement = document.createElement("div");
    const nbrLikes = document.createElement("span");
    nbrLikes.textContent = `${likes}`;

    const likeIcone = document.createElement("i");
    likeIcone.classList.add("fa-regular");
    likeIcone.classList.add("fa-heart");
    likeIcone.onclick = toggleLike;

    // Add image to card
    article.append(img);

    // Add details to card (title, nbr likes)
    article.append(detailsContainer);
    detailsContainer.append(likesElement);
    likesElement.append(nbrLikes);
    likesElement.append(likeIcone);
    detailsContainer.append(h2);

    return article;
  }

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

  return { getMediaCardDOM };
}
// TODO: structure des donénes pour les médias à afficher? Les grouper par photographes? Mélanger toute les images de tout le monde dans un fichier commun? Pas d'importance?
