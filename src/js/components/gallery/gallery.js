import "./gallery.css";

export default class Gallery {
  constructor(element) {
    this.element = element;

    this.element.addEventListener("click", this.deleteImage);
  }

  renderImage(name, url) {
    return `
      <article class="item-container">
        <div class="image-container">
          <img src="${url}" class="image">
        </div>
        <span class="name-img">${name}</span>
        <span class="delete-image">X</span>
      </article>
    `;
  }

  deleteImage(e) {
    if (e.target.classList.contains("delete-image")) {
      e.target.closest(".item-container").remove();
    }
  }
}
