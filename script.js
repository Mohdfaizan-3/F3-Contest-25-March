"use strict";

const getGeolocationBtn = document.querySelector(
  ".get-geolocation-btn"
);
const removeGeolocationBtn = document.querySelector(
  ".remove-geolocation-btn"
);
const displayMap = document.querySelector(".display-map");

//  check initially if location is present in local-storage, if yes then directly display
const localCoordinates = JSON.parse(
  localStorage.getItem("user-coordinates")
);
if (localCoordinates) {
  getGeolocationBtn.style.display = "none";
  displayMap.innerHTML = null;
  fetchUserLocation(localCoordinates);
}

// get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // geolocation not supported
    console.error("geolocation not supported");
    displayMap.innerText("geolocation not supported");
  }
}

// store lat and long in local storage
function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  localStorage.setItem(
    "user-coordinates",
    JSON.stringify(userCoordinates)
  );

  getGeolocationBtn.style.display = "none";
  displayMap.innerHTML = null;
  fetchUserLocation(userCoordinates);
}

// get lat and long and display in display map
function fetchUserLocation(coordinates) {
  const { lat, lon } = coordinates;

  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    `https://maps.google.com/maps?q=
${lat}, ${lon}&output=embed`
  );
  iframe.setAttribute("width", "100%");
  iframe.setAttribute("height", "100%");
  displayMap.appendChild(iframe);
}

// to remove lat and long from local storage
function removeLocation() {
  localStorage.removeItem("user-coordinates");
  getGeolocationBtn.style.display = "flex";
  displayMap.innerHTML = null;
}

getGeolocationBtn.addEventListener("click", getLocation);
removeGeolocationBtn.addEventListener(
  "click",
  removeLocation
);
