'use strict';

var initMap = function initMap() {
    var mapContainer = document.querySelector("#map");
    var mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13
    };
    var map = new google.maps.Map(mapContainer, mapOptions);
    var marker = new google.maps.Marker({
        position: {
            lat: 51.5074,
            lng: -0.1278
        },
        map: map
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var userPositionMarker = new google.maps.Marker({
                position: {
                    lat: userLocation.lat,
                    lng: userLocation.lng
                },
                map: map
            });
            console.log(userLocation);
            map.setCenter(userLocation);
        }, function () {
            errorCallback(true, map.getCenter());
        });
    } else {
        errorCallback(false, map.getCenter());
    }
    var errorCallback = function errorCallback(browserGeolocation, pos) {
        browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
    };
};