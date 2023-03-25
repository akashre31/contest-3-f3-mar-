// Get the HTML elements
const getLocationBtn = document.getElementById("get-location-btn");
const removeLocationBtn = document.getElementById("remove-location-btn");
const mapDiv = document.getElementById("map");

// Check if Geolocation API is supported
if ("geolocation" in navigator) {
  getLocationBtn.disabled = false; // Enable the Get Location button
} else {
  alert("Geolocation is not supported by this browser.");
}

// Get the user's location and display it on a map
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  const latitude = 15.8855428  ;
  const longitude = 74.5111606;
  
  // Save the location in localStorage
  localStorage.setItem("lat", latitude);
  localStorage.setItem("long", longitude);
  
  // Show the location on a map
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
  mapDiv.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`;
  
  getLocationBtn.disabled = true; // Disable the Get Location button
}

// Remove the location from localStorage
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  mapDiv.innerHTML = ""; // Remove the map from the HTML
  getLocationBtn.disabled = false; // Enable the Get Location button
}

// Add event listeners
getLocationBtn.addEventListener("click", getLocation);
removeLocationBtn.addEventListener("click", removeLocation);

// Check if location is already stored in localStorage
const storedLat = localStorage.getItem("lat");
const storedLong = localStorage.getItem("long");
if (storedLat && storedLong) {
  showPosition({ coords: { latitude: storedLat, longitude: storedLong } });
}

