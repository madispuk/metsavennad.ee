document.addEventListener("DOMContentLoaded", function () {
  var mapEl = document.querySelector("[data-region-map]");
  if (!mapEl) return;

  var region = mapEl.dataset.regionMap;

  // Region-specific configuration (bounds for rectangles, coords for polygons)
  var regionConfig = {
    misso: {
      name: "Misso",
      type: "rectangle",
      coords: [
        [57.79, 27.05],
        [57.53, 27.55],
      ],
    },
    rouge: {
      name: "Rõuge",
      type: "rectangle",
      coords: [
        [57.82, 26.58],
        [57.58, 27.11],
      ],
    },
    sangaste: {
      name: "Sangaste",
      type: "polygon",
      coords: [
        [58.01487559889733, 26.291246804073864],
        [57.714107644947035, 26.29947136516725],
        [57.689937521291796, 26.704530999038496],
        [57.78432905973415, 26.971829234588313],
        [57.907981021308075, 26.965660813767954],
        [58.01487559889733, 26.291246804073864],
      ],
    },
  };

  if (!regionConfig[region]) {
    console.warn("Unknown region for map:", region);
    return;
  }

  var map = L.map(mapEl.id, {
    zoomControl: false,
    attributionControl: false,
  }).setView([58.6, 25.5], 6);

  L.tileLayer("https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png", {
    maxZoom: 18,
    tms: true,
  }).addTo(map);

  // Draw inactive regions first (background)
  Object.keys(regionConfig).forEach(function (key) {
    if (key === region) return;
    var config = regionConfig[key];
    var shapeOptions = {
      color: "#B8BFC7",
      weight: 2,
      fillColor: "#B8BFC7",
      fillOpacity: 0.2,
      className: "cursor-pointer",
    };
    var shape;
    if (config.type === "polygon") {
      shape = L.polygon(config.coords, shapeOptions);
    } else {
      shape = L.rectangle(config.coords, shapeOptions);
    }
    shape.bindTooltip(config.name, {
      direction: "top",
      className: "region-tooltip",
    });
    shape.on("mouseover", function () {
      this.setStyle({ fillColor: "#9CA3AF", color: "#9CA3AF" });
    });
    shape.on("mouseout", function () {
      this.setStyle({ fillColor: "#B8BFC7", color: "#B8BFC7" });
    });
    shape.on("click", function () {
      window.location.href = "/" + key;
    });
    shape.addTo(map);
  });

  // Draw active region on top
  var activeConfig = regionConfig[region];
  var activeOptions = {
    color: "#8B0000",
    weight: 2,
    fillColor: "#8B0000",
    fillOpacity: 0.2,
  };
  var activeShape;
  if (activeConfig.type === "polygon") {
    activeShape = L.polygon(activeConfig.coords, activeOptions);
  } else {
    activeShape = L.rectangle(activeConfig.coords, activeOptions);
  }
  activeShape.bindTooltip(activeConfig.name, {
    direction: "top",
    className: "region-tooltip",
  });
  activeShape.on("mouseover", function () {
    this.setStyle({ fillColor: "#6B0000", color: "#6B0000" });
  });
  activeShape.on("mouseout", function () {
    this.setStyle({ fillColor: "#8B0000", color: "#8B0000" });
  });
  activeShape.addTo(map);
});
