/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/components/add-widget/widget-file-upload.js

class WidgetFileUpload {
  constructor(parentEl, renderImage) {
    this.parentEl = parentEl;
    this._renderImage = renderImage;
    this.getDropFile = this.getDropFile.bind(this);
    this.handlerInputFile = this.handlerInputFile.bind(this);
    this.getSelectFile = this.getSelectFile.bind(this);
    this.handlerFile = this.handlerFile.bind(this);
    this.addPreviewImage = this.addPreviewImage.bind(this);
  }
  static get markup() {
    return `
            <div class="file-container">
              <input type="file" class="file-container__input" accept="image/*">
              <div class="file-container__overlap overlap-content">
                <span class="overlap-content__text">Drag and Drop files here</span>
                <span class="overlap-content__text">or Click to select</span>
              </div>          
            </div>
          `;
  }
  static get containerSelector() {
    return ".file-container";
  }
  static get inputSelector() {
    return ".file-container__input";
  }
  static get overlapSelector() {
    return ".file-container__overlap";
  }
  bindToDOM() {
    this.parentEl.innerHTML = WidgetFileUpload.markup;
    this.fileContainer = this.parentEl.querySelector(WidgetFileUpload.containerSelector);
    this.fileInput = this.fileContainer.querySelector(WidgetFileUpload.inputSelector);
    this.overlapElement = this.fileContainer.querySelector(WidgetFileUpload.overlapSelector);
    this.fileContainer.addEventListener("click", this.handlerInputFile);
    document.documentElement.addEventListener("dragover", this.preventDefaultDragover);
    document.documentElement.addEventListener("drop", this.getDropFile);
  }
  preventDefaultDragover(e) {
    e.preventDefault();
  }
  getDropFile(e) {
    e.preventDefault();
    if (e.target !== this.overlapElement) return;
    const fileObj = e.dataTransfer.files && e.dataTransfer.files[0];
    const typeFile = e.dataTransfer.files[0].type;
    if (!typeFile.startsWith("image")) return;
    this.handlerFile(fileObj);
  }
  handlerInputFile() {
    this.fileInput.dispatchEvent(new MouseEvent("click"));
    this.fileInput.addEventListener("change", this.getSelectFile);
  }
  getSelectFile() {
    const fileObj = this.fileInput.files && this.fileInput.files[0];
    this.handlerFile(fileObj);
  }
  handlerFile(file) {
    if (!file) return;
    const name = file.name;
    const url = URL.createObjectURL(file);
    this.addPreviewImage(name, url);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  addPreviewImage(name, url) {
    const imageElement = this._renderImage(name, url);
    document.querySelector(".gallery").insertAdjacentHTML("beforeEnd", imageElement);
    this.clearFileInput();
  }
  clearFileInput() {
    this.fileInput.value = "";
  }
}
;// CONCATENATED MODULE: ./src/js/components/gallery/gallery.js

class Gallery {
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
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  const widgetElement = document.querySelector(".widget-file-upload");
  const galleryElement = document.querySelector(".gallery");
  const gallery = new Gallery(galleryElement);
  const widgetFileUpload = new WidgetFileUpload(widgetElement, gallery.renderImage);
  widgetFileUpload.bindToDOM();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;