function photographerFactory(data) {
  const { name, portrait, id, tagline, price, city, country } = data;

  const picture = `/assets/photographers/portraits/${portrait}`;

  const profilURL = `./photographer.html?id=${id}`;

  function getUserCardDOM() {
    // Create a card for a photographer presentation
    const article = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.href = profilURL;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = name;

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const localisation = document.createElement("p");
    localisation.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("blockquote");
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("div");
    priceElement.textContent = `${price}€/jour`;

    article.appendChild(anchor);
    anchor.appendChild(img);
    anchor.appendChild(localisation);
    anchor.appendChild(taglineElement);
    anchor.appendChild(h2);
    anchor.appendChild(priceElement);
    return article;
  }
  return { name, picture, getUserCardDOM, profilURL };
}
