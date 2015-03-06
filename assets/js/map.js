function initialize() {
    navigator.geolocation.getCurrentPosition(function (position) {
        handleLocation(position.coords.latitude, position.coords.longitude);
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

function locInfo(pos) {
    console.log(pos);
    var data = {
        'lat': pos.coords.latitude,
        'long': pos.coords.longitude
    };
    console.log(data);
    return data;
}
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function handleLocation(lat, long) {
    var myLatlng = new google.maps.LatLng(lat, long);

     var style = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f57c00"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":50},{"lightness":5}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#444444"},{"visibility":"on"}]}];
    var mapOptions = {
        zoom: 5,
        center: myLatlng,
        styles : style
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    var image = 'assets/img/iconMaps.png';
    var currentPos = new google.maps.Marker({
        position: myLatlng,
        title:"You are here",
        icon : image
    });

// To add the marker to the map, call setMap();
    currentPos.setMap(map);

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    $.getJSON("http://apiapp.mmi-lepuy.fr/agency/?action=all", function (data) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i][6], data[i][7]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(data[i][1]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    });

}


