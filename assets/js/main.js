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
    let marker = new google.maps.Marker({
        position: {
            lat: 51.5074,
            lng: -0.1278
        },
        map: map
    });
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            let userPositionMarker = new google.maps.Marker({
                position: {
                    lat: userLocation.lat,
                    lng: userLocation.lng
                },
                map: map
            })
            console.log(userLocation);
            map.setCenter(userLocation);
        }, () => {
            errorCallback(true, map.getCenter());
        });
    } else {
        errorCallback(false, map.getCenter());
    }
    const errorCallback = (browserGeolocation, pos) => {
        browserGeolocation ? console.log('Error: The Geolocation service failed.') : console.log('Error: Your browser doesn\'t support geolocation.');
    }
}