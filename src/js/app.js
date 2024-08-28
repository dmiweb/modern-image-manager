import WidgetFileUpload from "./components/add-widget/widget-file-upload";
import Gallery from "./components/gallery/gallery";

document.addEventListener("DOMContentLoaded", () => {
  const widgetElement = document.querySelector(".widget-file-upload");
  const galleryElement = document.querySelector(".gallery");

  const gallery = new Gallery(galleryElement);

  const widgetFileUpload = new WidgetFileUpload(
    widgetElement,
    gallery.renderImage
  );
  widgetFileUpload.bindToDOM();
});
