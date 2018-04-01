const initMap = () => {
    const mapContainer = document.querySelector("#map");
    let mapOptions = {
        center: {
            lat: 51.5074,
            lng: -0.1278
        },
        zoom: 14,
        mapTypeId: 'terrain',
        styles: mapStyle
    }
    const map = new google.maps.Map(mapContainer, mapOptions);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: false});
    const geocoder = new google.maps.Geocoder;
    directionsDisplay.setMap(map);
    geolocateUser(map, geocoder, directionsService, directionsDisplay);

    
    


    // const locationBtn = document.querySelector("#find-user");
    // const routeBtn = document.querySelector("#find-route");
    const routeBtn = document.querySelector("#find-route");    
    
    // routeBtn.addEventListener('click', () => {
    //     console.log('click route btn');
    //     calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation);
    //     routeBtn.classList.add('active');
    // });

    


}



const geolocateUser = (map, geocoder, directionsService, directionsDisplay) => {
    let userLocation;
    if (navigator.geolocation) { 
        userLocation = {
            lat: 51.5074,
            lng: -0.1278
        }
        addCustomMarker(userLocation, map, 'assets/img/userMarker.png', 'User Location');
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
            addCustomMarker(userLocation, map, 'assets/img/_userMarker.png', 'User Location');
            console.log(userLocation);
            map.setCenter(userLocation);
            geocodeLatLng(geocoder, map, userLocation);
            
        }, () => {
            errorCallback(true, map.getCenter());
        });
    } else {
        errorCallback(false, map.getCenter());
    }
    enableUI(directionsService, directionsDisplay, userLocation, map);
}

const enableUI = (directionsService, directionsDisplay, userLocation, map) => {
    const transportModes = document.querySelectorAll(".buttons button");
    for (let i = 0; i < transportModes.length; i++) {
        transportModes[i].addEventListener('click', () => {
            let selectedMode = transportModes[i].value.toUpperCase();
            console.log(selectedMode);
            calculateAndDisplayRoute(directionsService, directionsDisplay, userLocation, selectedMode, map);
        })
    }
}






const calculateAndDisplayRoute = (directionsService, directionsDisplay, startingPoint, selectedMode, map) => {
    console.log('calculateRoute called');
    // const buttonDrive = document.querySelector("#driving");
    // buttonDrive.classList.add("active");


    
    let destination = {
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
    }

    directionsService.route(
        {
            origin: startingPoint,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true,
        }, (response, status) => {
            if (status === "OK") {
                directionsDisplay.setDirections(response);
                const leg = response.routes[0].legs[0];
                addCustomMarker(leg.start_location, map, 'assets/img/userMarker.png', 'User location');
                addCustomMarker(leg.end_location, map, 'assets/img/museumMarker.png', 'Sir John Soane\'s Museum');
                

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

const addCustomMarker = (position, map, icon, title) => {
    console.log('addCustomMarker called');
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP,
    });
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