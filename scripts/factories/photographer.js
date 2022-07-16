function photographerFactory(data) {
  const { name, portrait, id, tagline, price, city, country } = data;

  const picture = `/assets/photographers/portraits/${portrait}`;

  const profilURL = `./photographer/${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    anchor.href = profilURL;

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    article.appendChild(anchor);
    anchor.appendChild(img);
    anchor.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM, profilURL };
}
