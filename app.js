// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMTCWFQCxQzZEa5H09D2PydKmV7PPlv4s",
  authDomain: "geolocation-tracker-80d8f.firebaseapp.com",
  databaseURL: "https://geolocation-tracker-80d8f-default-rtdb.firebaseio.com",
  projectId: "geolocation-tracker-80d8f",
  storageBucket: "geolocation-tracker-80d8f.firebasestorage.app",
  messagingSenderId: "8203650693",
  appId: "1:8203650693:web:193569516db9966fc80bec",
  measurementId: "G-YGG40M1LYQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize the map
let map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker on the map
let marker = L.marker([0, 0]).addTo(map);

// Function to track location and share it
function trackLocation() {
  const status = document.getElementById("status");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update the map with the new location
        const location = [latitude, longitude];
        map.setView(location, 13);
        marker.setLatLng(location);

        // Send data to Firebase
        firebase.database().ref("locations").push({
          latitude: latitude,
          longitude: longitude,
          timestamp: new Date().toISOString(),
        });

        status.innerText = `Location shared: Latitude ${latitude}, Longitude ${longitude}`;
      },
      (error) => {
        status.innerText = `Error: ${error.message}`;
      }
    );
  } else {
    status.innerText = "Geolocation is not supported by your browser.";
  }
}