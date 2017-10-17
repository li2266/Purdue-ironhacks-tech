window.onload = myLoad;
function myLoad()
{ 
    lat = 23.14746;
    lng = 113.34175376;
    var myLatLng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementByIdx_x("map"), myOptions);
}