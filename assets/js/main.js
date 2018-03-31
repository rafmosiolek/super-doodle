const initMap = () => {
    const mapContainer = document.querySelector("#map");
    let mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 13,
        mapTypeId: 'terrain'
    }
    const map = new google.maps.Map(mapContainer, mapOptions);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const geocoder = new google.maps.Geocoder;
    directionsDisplay.setMap(map);

    let userLocation;
    if (navigator.geolocation) { 
        console.log('geolocation');
        userLocation = {
            lat: 51.490264,
                    lng:  -0.143563
        }
        geocodeLatLng(geocoder, map, userLocation);

        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        const errorCallback = (browserGeolocation, pos) => {
            browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
        }
        console.log(options);
        navigator.geolocation.getCurrentPosition((position, options) => {
            console.log('found');
            
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            let userPosition = new google.maps.Marker({
                position: userLocation,
                map: map,
                animation: google.maps.Animation.DROP,
            });
            console.log(userLocation);
            map.setCenter(userLocation);
            geocodeLatLng(geocoder, map, userLocation);
            
        }, () => {
            errorCallback(true, map.getCenter());
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
    const routeBtn = document.querySelector("#find-route");    
    
    routeBtn.addEventListener('click', () => {
        console.log('click route btn');
        calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation);
    });
}





const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint) => {
    console.log('calculateRoute called');
    
    let destination = {
        lat: 50.822624,
        lng: -0.137112
    }

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

const geocodeLatLng = (geocoder, map, userLocation) => {
    let userLocationDisplay = document.querySelector(".user-location input");
    geocoder.geocode({
        'location': userLocation
    }, (results, status) => {
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
}