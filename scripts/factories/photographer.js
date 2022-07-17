function photographerFactory(data) {
  const { name, portrait, id, tagline, price, city, country } = data;

  const picture = `/assets/photographers/portraits/${portrait}`;

  const profilURL = `./photographer.html?id=${id}`;

  const localisationText = `${city}, ${country}`;

  // Create a container with photographer main details
  function getUserDetailsDOM() {
    const container = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const localisation = document.createElement("p");
    localisation.textContent = localisationText;

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
    img.alt = name;

    return img;
  }

  function getUserCardDOM() {
    // Create a card for a photographer presentation
    const article = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.href = profilURL;

    const img = getUserPictureDOM();

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const localisation = document.createElement("p");
    localisation.textContent = localisationText;

    const taglineElement = document.createElement("blockquote");
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("div");
    priceElement.textContent = `${price}€/jour`;

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

  return {
    name,
    picture,
    getUserCardDOM,
    getUserPictureDOM,
    getUserDetailsDOM,
  };
}
