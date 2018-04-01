"use strict";

var initMap = function initMap() {
    var mapContainer = document.querySelector("#map");
    var mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 14,
        mapTypeId: 'terrain',
        styles: mapStyle
    };
    var map = new google.maps.Map(mapContainer, mapOptions);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: false });
    var geocoder = new google.maps.Geocoder();
    directionsDisplay.setMap(map);
    geolocateUser(map, geocoder, directionsService, directionsDisplay);

    // const locationBtn = document.querySelector("#find-user");
    // const routeBtn = document.querySelector("#find-route");
    var routeBtn = document.querySelector("#find-route");

    // routeBtn.addEventListener('click', () => {
    //     console.log('click route btn');
    //     calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation);
    //     routeBtn.classList.add('active');
    // });

};

var geolocateUser = function geolocateUser(map, geocoder, directionsService, directionsDisplay) {
    var userLocation = void 0;
    if (navigator.geolocation) {
        userLocation = {
            lat: 51.5074,
            lng: -0.1278
        };
        addCustomMarker(userLocation, map, 'assets/img/userMarker.png', 'User Location');
        console.log('geolocation');
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        var _errorCallback = function _errorCallback(browserGeolocation, pos) {
            browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
        };
        console.log(options);
        navigator.geolocation.getCurrentPosition(function (position, options) {
            console.log('found');

            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            addCustomMarker(userLocation, map, 'assets/img/_userMarker.png', 'User Location');
            console.log(userLocation);
            map.setCenter(userLocation);
            geocodeLatLng(geocoder, map, userLocation);
        }, function () {
            _errorCallback(true, map.getCenter());
        });
    } else {
        errorCallback(false, map.getCenter());
    }
    enableUI(directionsService, directionsDisplay, userLocation, map);
};

var enableUI = function enableUI(directionsService, directionsDisplay, userLocation, map) {
    var transportModes = document.querySelectorAll(".buttons button");

    var _loop = function _loop(i) {
        transportModes[i].addEventListener('click', function () {
            var selectedMode = transportModes[i].value.toUpperCase();
            console.log(selectedMode);
            calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation, selectedMode, map);
        });
    };

    for (var i = 0; i < transportModes.length; i++) {
        _loop(i);
    }
};

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint, selectedMode, map) {
    console.log('calculateRoute called');
    // const buttonDrive = document.querySelector("#driving");
    // buttonDrive.classList.add("active");


    var destination = {
        // BRIGHTON
        // lat: 50.822624,
        // lng: -0.137112
        // RICHMOND
        // lat: 51.444928,
        // lng: -0.276938
        // SNOWDONIA
        // lat: 52.917950, 
        // lng: -3.891215
        // LAKE DISTRICT
        // lat:54.461339, 
        // lng: -3.088584
        // SIR JOHN SOANE'S MUSUEM
        lat: 51.517058,
        lng: -0.117470
    };

    directionsService.route({
        origin: startingPoint,
        destination: destination,
        travelMode: google.maps.TravelMode[selectedMode],
        unitSystem: google.maps.UnitSystem.METRIC,
        provideRouteAlternatives: true
    }, function (response, status) {
        if (status === "OK") {
            directionsDisplay.setDirections(response);
            var leg = response.routes[0].legs[0];
            addCustomMarker(leg.start_location, map, 'assets/img/userMarker.png', 'User location');
            addCustomMarker(leg.end_location, map, 'assets/img/museumMarker.png', 'Sir John Soane\'s Museum');
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};

var addCustomMarker = function addCustomMarker(position, map, icon, title) {
    console.log('addCustomMarker called');
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP
    });
};

var geocodeLatLng = function geocodeLatLng(geocoder, map, userLocation) {
    var userLocationDisplay = document.querySelector(".user-location input");
    geocoder.geocode({
        'location': userLocation
    }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                console.log(results[0].formatted_address);
                userLocationDisplay.value = results[0].formatted_address;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
};