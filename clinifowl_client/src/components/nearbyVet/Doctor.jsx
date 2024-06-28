import { Component } from "react";
import "./Doctor.scss";
import Sidebar from "./component/sidebar/Sidebars.jsx";
import Map from "./component/map/Maps.jsx";
import mapStyle from "./mapstyles.jsx";
import Header from "../landingpage/Header.jsx";

var map;
var infowindow;
var service;

function calculateAndDisplayRoute(origin, destLat, destLng) {
  var directionsService = new window.google.maps.DirectionsService();
  var directionsRenderer = new window.google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  var destination = { lat: destLat, lng: destLng };

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

class Doctor extends Component {
  state = {
    placesDetails: [],
    sortedPlacesDetails: [],
    lat: 33.6844,
    lng: 73.0479,
    zoom: 17,
    selectedDestination: null, // Add a state to hold the selected destination
  };

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js&libraries=places&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    var location = {
      lat: this.state.lat,
      lng: this.state.lng,
    };

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15,
      styles: mapStyle,
    });

    var marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: "You're Here!",
    });

    this.getCurrentLocation();

    var request = {
      location: location,
      radius: 5000,
      type: ["veterinary_care"],
    };

    infowindow = new window.google.maps.InfoWindow();
    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);
  };

  callback = (results, status) => {
    let that = this;
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      let placesInfo = [];
      let fields = [
        "name",
        "formatted_address",
        "formatted_phone_number",
        "rating",
        "user_ratings_total",
        "reviews",
        "photo",
        "place_id",
        "geometry",
      ];

      results.forEach((place) => {
        service.getDetails(
          { placeId: place.place_id, fields },
          function (placeInfo, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              placesInfo.push(placeInfo);
              that.setState(
                {
                  placesDetails: placesInfo,
                  sortedPlacesDetails: placesInfo,
                },
                () => that.addMarkers(placesInfo)
              );
            }
          }
        );
      });
    }
  };

  addMarkers = (placesInfo) => {
    placesInfo.forEach(this.createMarker);
  };

  createMarker = (place) => {
    var marker = new window.google.maps.Marker({
      map: map,
      title: place.name,
      icon: {
        url: "https://img.freepik.com/premium-vector/vector-design-veterinary-clinic-sign-animal-footprint-with-medical-cross-transparent-back_855620-662.jpg",
        anchor: new window.google.maps.Point(10, 10),
        scaledSize: new window.google.maps.Size(30, 30),
      },
      position: place.geometry.location,
    });

    marker.addListener("click", () => {
      let placePicture = place.photos
        ? place.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 })
        : "https://via.placeholder.com/300";

      let content = `
      <h2>${place.name}</h2>
      <img src=${placePicture}>
      <ul>
        <li>${place.formatted_address}</li>
        <li>${place.formatted_phone_number}</li>
      </ul>
      <button class="get-direction-btn">Get Directions</button>
      <button class="open-google-maps-btn">Open in Google Maps</button>
    `;
      infowindow.setContent(content);
      infowindow.open(map, marker);

      // Ensure the DOM is ready before attaching the event listeners
      google.maps.event.addListenerOnce(infowindow, "domready", () => {
        const directionButton = document.querySelector(".get-direction-btn");
        directionButton.addEventListener("click", () => {
          this.calculateAndDisplayRoute(
            { lat: this.state.lat, lng: this.state.lng },
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });

        const googleMapsButton = document.querySelector(
          ".open-google-maps-btn"
        );
        googleMapsButton.addEventListener("click", () => {
          this.openInGoogleMaps(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  };

  openInGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  getCurrentLocation = () => {
    let self = this;
    let infoWindow = new window.google.maps.InfoWindow();

    let handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You're here!");
          infoWindow.open(map);
          map.setCenter(pos);

          self.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          self.initMap();
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  handleSort = (e) => {
    const minRating = parseInt(e.target.value);
    let sortedPlaces;

    if (minRating === 0) {
      sortedPlaces = this.state.placesDetails; // Show all places
    } else {
      sortedPlaces = this.state.placesDetails.filter(
        (place) => place.rating >= minRating
      );
    }

    this.setState({
      sortedPlacesDetails: sortedPlaces,
    });
  };

  addPlace = (newPlace) => {
    let currentPlaces = this.state.placesDetails;
    currentPlaces.push(newPlace);

    let placeMarker = () => {
      let latLng = {
        lat: newPlace.lat,
        lng: newPlace.lng,
      };

      var marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: newPlace.name,
        icon: {
          url: "https://img.freepik.com/premium-vector/vector-design-veterinary-clinic-sign-animal-footprint-with-medical-cross-transparent-back_855620-662.jpg",
          anchor: new window.google.maps.Point(10, 10),
          scaledSize: new window.google.maps.Size(20, 20),
        },
      });
      marker.setMap(map);
      map.setCenter(latLng);

      marker.addListener("click", function () {
        let placePicture = newPlace.photos
          ? newPlace.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 })
          : "https://via.placeholder.com/300";

        let content = `
          <h2>${newPlace.name}</h2>
          <img src=${placePicture}>
          <ul>
            <li>${newPlace.formatted_address}</li>
            <li>${newPlace.formatted_phone_number}</li>
          </ul>
        `;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    };

    this.setState(
      {
        placesDetails: currentPlaces,
      },
      placeMarker()
    );
  };

  // Function to set the selected destination
  setSelectedDestination = (destLat, destLng) => {
    this.setState({
      selectedDestination: { lat: destLat, lng: destLng },
    });
  };

  // Function to trigger route calculation
  triggerRouteCalculation = () => {
    const { selectedDestination } = this.state;
    if (selectedDestination) {
      calculateAndDisplayRoute(
        { lat: this.state.lat, lng: this.state.lng },
        selectedDestination.lat,
        selectedDestination.lng
      );
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar
          placesDetails={this.state.sortedPlacesDetails}
          handleSort={this.handleSort}
          addPlace={this.addPlace}
          setSelectedDestination={this.setSelectedDestination} // Pass function to set the selected destination
          triggerRouteCalculation={this.triggerRouteCalculation} // Pass function to trigger route calculation
        />
        <Map />
      </div>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Doctor;
