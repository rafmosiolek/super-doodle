'use strict';

var initMap = function initMap() {
    var mapContainer = document.querySelector("#map");
    var mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain'
    };
    var map = new google.maps.Map(mapContainer, mapOptions);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var geocoder = new google.maps.Geocoder();
    directionsDisplay.setMap(map);

    var userLocation = void 0;
    if (navigator.geolocation) {
        console.log('geolocation');
        userLocation = {
            lat: 51.490264,
            lng: -0.143563
        };
        geocodeLatLng(geocoder, map, userLocation);

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
            var userPosition = new google.maps.Marker({
                position: userLocation,
                map: map,
                animation: google.maps.Animation.DROP
            });
            console.log(userLocation);
            map.setCenter(userLocation);
            geocodeLatLng(geocoder, map, userLocation);
        }, function () {
            _errorCallback(true, map.getCenter());
        });
    } else {
        errorCallback(false, map.getCenter());
    }

    // let destination = new google.maps.Marker({
    //     position: {
    //         lat: 51.5074,
    //         lng: -0.1278
    //     },
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    // });

    // let userPosition = new google.maps.Marker({
    //     position: {
    //         lat: 51.490264,
    //         lng:  -0.143563
    //         },
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    // });


    // const locationBtn = document.querySelector("#find-user");
    // const routeBtn = document.querySelector("#find-route");
    var routeBtn = document.querySelector("#find-route");

    routeBtn.addEventListener('click', function () {
        console.log('click route btn');
        calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation);
    });
};

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay, startingPoint) {
    console.log('calculateRoute called');

    var destination = {
        lat: 50.822624,
        lng: -0.137112
    };

    directionsService.route({
        origin: startingPoint,
        destination: destination,
        travelMode: "DRIVING",
        provideRouteAlternatives: true
    }, function (response, status) {
        status === "OK" ? directionsDisplay.setDirections(response) : window.alert('Directions request failed due to ' + status);
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