import { Component } from "react";
import "./Doctor.scss";
import Sidebar from "./component/sidebar/Sidebars.jsx";
import Map from "./component/map/Maps.jsx";
import mapStyle from "./mapstyles.jsx";

var map;
var infowindow;
var service;

class Doctor extends Component {
  state = {
    placesDetails: [],
    sortedPlacesDetails: [],
    lat: 33.6844,
    lng: 73.0479,
    zoom: 17,
  };

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCgow9YnBwuARfQoqvcCSAh01wfp7Xo6-0&libraries=places&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    // Default Location
    var location = {
      lat: this.state.lat,
      lng: this.state.lng,
    };

    // Initialize Map
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15,
      styles: mapStyle,
    });

    // Current Location Marker
    var marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: "You're Here!",
    });

    // Ask for user location
    this.getCurrentLocation();

    // Request Info: It will be used for Google Places API `PlacesServices` to get certain places that match our criteria
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

      // Get Places Details
      results.map((place) => {
        service.getDetails(
          { placeId: place.place_id, fields },
          function (placeInfo, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              // Add New Place
              placesInfo.push(placeInfo);

              // Update All Places & Add Markers
              that.setState(
                {
                  placesDetails: placesInfo,
                  sortedPlacesDetails: placesInfo,
                },
                that.addMarkers(placesInfo)
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
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        anchor: new window.google.maps.Point(10, 10),
        scaledSize: new window.google.maps.Size(20, 20),
      },
      position: place.geometry.location,
    });

    marker.addListener("click", function () {
      var request = {
        reference: place.reference,
      };

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
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
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
      // Position
      let latLng = {
        lat: newPlace.lat,
        lng: newPlace.lng,
      };

      // Add Marker
      var marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: newPlace.name,
        icon: {
          url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          anchor: new window.google.maps.Point(10, 10),
          scaledSize: new window.google.maps.Size(20, 20),
        },
      });
      marker.setMap(map);
      map.setCenter(latLng);

      // InfoWindow
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

    console.log(newPlace.lat, newPlace.lng);
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          placesDetails={this.state.sortedPlacesDetails}
          handleSort={this.handleSort}
          addPlace={this.addPlace}
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
