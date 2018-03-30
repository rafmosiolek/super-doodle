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
    directionsDisplay.setMap(map);

    let userLocation;
    if (navigator.geolocation) { 
        console.log('geolocation');
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
        lat: 51.5074,
        lng: -0.1278
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
