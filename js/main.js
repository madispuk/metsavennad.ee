import Alpine from "alpinejs";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "./region-map.js";

// LightGallery initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize lightgallery on all gallery containers
  document.querySelectorAll(".lg-gallery").forEach(function (gallery) {
    // Copy alt to data-sub-html for captions
    gallery.querySelectorAll("img").forEach(function (img) {
      if (img.alt && !img.getAttribute("data-sub-html")) {
        img.setAttribute("data-sub-html", img.alt);
      }
    });

    lightGallery(gallery, {
      plugins: [lgZoom, lgThumbnail],
      speed: 400,
      thumbnail: true,
      selector: "img",
      exThumbImage: "src",
    });
  });

  // Single image lightbox
  document.querySelectorAll(".lg-img").forEach(function (el) {
    var src = el.dataset.src || el.src || el.href;
    var lg = lightGallery(el, {
      plugins: [lgZoom],
      speed: 400,
      dynamic: true,
      dynamicEl: [{ src: src, thumb: src, subHtml: el.alt || "" }],
    });
    el.style.cursor = "pointer";
    el.addEventListener("click", function (e) {
      e.preventDefault();
      lg.openGallery(0);
    });
  });
});

// Alpine.js
Alpine.start();
