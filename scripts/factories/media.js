function mediaFactory(media, photographerName) {
  const { title, image, likes } = media;

  // Create the media path in the DB
  function getMediaPath() {
    const surname = photographerName.split(" ")[0];
    const mediaPath = `../../assets/photographers/medias/${surname}/${image}`;
    return mediaPath;
  }

  // Create a card for a picture media
  function getCardPictureDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.src = getMediaPath();

    article.append(img);
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
