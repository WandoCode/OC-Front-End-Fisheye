function photographerFactory(data, mediasData) {
  const { name, portrait, id, tagline, price, city, country } = data;

  const picture = `/assets/photographers/portraits/${portrait}`;

  const profilURL = `./photographer.html?id=${id}`;

  const localisationText = `${city}, ${country}`;

  function getLocalizationDOM() {
    const localisation = document.createElement("p");
    localisation.textContent = localisationText;
    localisation.classList.add("localization");

    return localisation;
  }

  // Create a container with photographer main details
  function getUserDetailsDOM() {
    const container = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const localisation = getLocalizationDOM();

    const taglineElement = document.createElement("blockquote");
    taglineElement.textContent = tagline;

    container.append(h1);
    container.append(localisation);
    container.append(taglineElement);

    return container;
  }

  // Create the image tag for user profil picture
  function getUserPictureDOM() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    return img;
  }

  // Create a card for a photographer presentation
  function getUserCardDOM() {
    const article = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.href = profilURL;
    anchor.ariaLabel = name;

    const img = getUserPictureDOM();

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const localisation = getLocalizationDOM();

    const taglineElement = document.createElement("blockquote");
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.classList.add("price");

    article.appendChild(anchor);

    // Linking elements
    anchor.appendChild(img);
    anchor.appendChild(h2);

    // Text elements
    article.appendChild(localisation);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  // Calcul the total number of likes for the photographer
  function getTotalLikes() {
    let initialValue = 0;

    const total = mediasData.reduce((sum, media) => {
      return sum + parseInt(media.likes);
    }, initialValue);

    return total;
  }

  // Display total nbr of likes and price for the photographer
  function getNotchDOM() {
    const totalLikes = getTotalLikes();

    const priceContainer = document.createElement("p");

    const priceText = `${price}€ / jour`;
    priceContainer.textContent = priceText;

    const notch = document.createElement("div");
    notch.classList.add("notch");

    const likesContainer = document.createElement("p");

    const nbrLikes = document.createElement("span");
    nbrLikes.textContent = `${totalLikes}`;

    const icon = document.createElement("i");
    icon.classList.add("fa-heart");
    icon.classList.add("fa-solid");

    notch.append(likesContainer);
    notch.append(priceContainer);

    likesContainer.append(nbrLikes);
    likesContainer.append(icon);

    return notch;
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getUserPictureDOM,
    getUserDetailsDOM,
    getNotchDOM,
  };
}
