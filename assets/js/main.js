const initMap = () => {
    const mapContainer = document.querySelector("#map");
    let mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13
    }
    const map = new google.maps.Map(mapContainer, mapOptions);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    
    let destination = new google.maps.Marker({
        position: {
            lat: 51.5074,
            lng: -0.1278
        },
        map: map,
        animation: google.maps.Animation.DROP,
    });
    
    let userPosition = new google.maps.Marker({
        position: {
            lat: 51.490264,
            lng:  -0.143563
            },
        map: map,
        animation: google.maps.Animation.DROP,
    });

   
    let start = destination.position;
    let end = userPosition.position;

    calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
    // console.log(directionsService, directionsDisplay, start, end);
    // if (navigator.geolocation) { 
    //     console.log('geolocaction')
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         console.log('found');
    //         let userLocation = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         }
    //         let userPositionMarker = new google.maps.Marker({
    //             position: {
    //                 lat: userLocation.lat,
    //                 lng: userLocation.lng
    //             },
    //             map: map,
    //             animation: google.maps.Animation.DROP,
    //         })
    //         console.log(userLocation);
    //         map.setCenter(userLocation);
    //     }, () => {
    //         errorCallback(true, map.getCenter());
    //     });
    // } else {
    //     errorCallback(false, map.getCenter());
    // }
    // const errorCallback = (browserGeolocation, pos) => {
    //     browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
    // }
}

const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint, destination) => {
    console.log('calculateRoute called');
    
    directionsService.route(
        {
            origin: startingPoint,
            destination: destination,
            travelMode: "DRIVING",
            provideRouteAlternatives: true,
        }, (response, status) => {
            status === "OK" ? directionsDisplay.setDirections(response) : window.alert('Directions request failed due to ' + status);
        }
    );
}
