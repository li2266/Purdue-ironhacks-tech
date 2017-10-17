var map;
var market;



function initMap() {
    
    var mapCenter = new google.maps.LatLng(40.426702, -86.875290), mapCanvas = document.getElementById('map'), mapOptions = {center: mapCenter, zoom: 12}; 
    
    map = new google.maps.Map(mapCanvas, mapOptions);
    
    var marker = []
    for (var i = 0; i<4; i++){
        var myCor = new google.maps.LatLng(market.x[i], market.y[i]);
        marker[i] = new google.maps.Marker({
            position: myCor,
            title: market.MarketName[i]
        });
        marker[i].setMap(map);
    }

    google.maps.event.addListener(marker[0], 'click', function () {
        document.getElementById("market_name").innerHTML = "<b>Market Name</b>: " + market.MarketName[0];
        document.getElementById("m_address").innerHTML = "<b>Address</b>: " + market.Street[0];
        document.getElementById("website").innerHTML = "<b>Website</b>: " + market.Website[0];
        document.getElementById("season").innerHTML = "<b>Month Open</b>: " + market.Season1Date[0];
        document.getElementById("time").innerHTML = "<b>Timings</b>: " + market.Season1Time[0];
        document.getElementById("credit").innerHTML = "<b>Accept Credit Card</b>: " + market.Credit[0];
    });
    
    google.maps.event.addListener(marker[1], 'click', function () {
        document.getElementById("market_name").innerHTML = "<b>Market Name</b>: " + market.MarketName[1];
        document.getElementById("m_address").innerHTML = "<b>Address</b>: " + market.Street[1];
        document.getElementById("website").innerHTML = "<b>Website</b>: " + market.Website[1];
        document.getElementById("season").innerHTML = "<b>Month Open</b>: " + market.Season1Date[1];
        document.getElementById("time").innerHTML = "<b>Timings</b>: " + market.Season1Time[1];
        document.getElementById("credit").innerHTML = "<b>Accept Credit Card</b>: " + market.Credit[1];
    });
    
        google.maps.event.addListener(marker[2], 'click', function () {
        document.getElementById("market_name").innerHTML = "<b>Market Name</b>: " + market.MarketName[2];
        document.getElementById("m_address").innerHTML = "<b>Address</b>: " + market.Street[2];
        document.getElementById("website").innerHTML = "<b>Website</b>: " + market.Website[2];
        document.getElementById("season").innerHTML = "<b>Month Open</b>: " + market.Season1Date[2];
        document.getElementById("time").innerHTML = "<b>Timings</b>: " + market.Season1Time[2];
        document.getElementById("credit").innerHTML = "<b>Accept Credit Card</b>: " + market.Credit[2];
    });
    
        google.maps.event.addListener(marker[3], 'click', function () {
        document.getElementById("market_name").innerHTML = "<b>Market Name</b>: " + market.MarketName[3];
        document.getElementById("m_address").innerHTML = "<b>Address</b>: " + market.Street[3];
        document.getElementById("website").innerHTML = "<b>Website</b>: " + market.Website[3];
        document.getElementById("season").innerHTML = "<b>Month Open</b>: " + market.Season1Date[3];
        document.getElementById("time").innerHTML = "<b>Timings</b>: " + market.Season1Time[3];
        document.getElementById("credit").innerHTML = "<b>Accept Credit Card</b>: " + market.Credit[3];
    });
}

var homeLat, homeLng, homeCor, homemarker, homeflag = 0;
function httpGetaddress() {
    
    var input = document.getElementById('address').value.split(' ').join('+');
    var theUrl = 'http://maps.google.com/maps/api/geocode/json?address=' + input + ',+IN%22';
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send();

    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);
            homeLat = json.results[0].geometry.location.lat;
            homeLng = json.results[0].geometry.location.lng;
            
            if ( homeflag == 0){
                homeflag = 1;
                homeCor = new google.maps.LatLng(homeLat, homeLng);
                homemarker = new google.maps.Marker(
                    {position: homeCor,
                     draggable:true,
                     label:'H',
                     title: 'Home'
                    }
                );
                homemarker.setMap(map);
            }else{
                homemarker.setPosition( new google.maps.LatLng(homeLat, homeLng) );
            }
        }
    }
}

var market_object, market_json;
market_object = {
    "MarketName": ["West Lafayette Farmers Market", "Sagamore West Farmers Market", "Purdue Farmers Market", "Historic Lafayette Farmers Market"],
    "Website": ["http://wlfarmersmarket.com", "http://www.westlafayette.in.gov/farmersmarket", "http://www.purdue.edu/sustainability/farmersmarket.html", "http://www.lafayettefarmersmarket.com"],
    "Street": ["3065 N Salisbury St", "Cumberland Park", "Oval Dr", "N 5th St, Lafayette"],
    "Season1Date": ["June to October", "May to October", "Jan to October", "March to October"],
    "Season1Time": ["Wed: 3:30 PM-7:00 PM", "Wed:3:00 PM - 6:30 PM", "Thu: 11:00 AM-3:00 PM", "Sat: 7:30 AM-12:30 PM"],
    "y": [-86.915836, -86.9136, -86.914239, -86.891895],
    "x": [40.461469, 40.4445, 40.42583, 40.417715],
    "Credit": ["Yes", "No", "Yes", "Yes"],
    "Winter": ["N", "N", "N", "N"],
    "Cheese": ["Y", "Y", "Y", "Y"],
    "Eggs": ["Y", "N", "Y", "Y"],
    "Vegetables": ["Y", "Y", "Y", "Y"],
    "Jams": ["Y", "Y", "Y", "Y"],
    "Meat": ["Y", "Y", "Y", "N"],
    "Coffee": ["N", "N", "Y", "Y"],
    "Beans": ["N", "N", "Y", "N"],
    "Fruits": ["Y", "N", "Y", "Y"],
    "Grains": ["N", "N", "Y", "N"],
    "Juices": ["N", "N", "Y", "Y"],
    "WildHarvested": ["N", "N", "Y", "N"]
};
market_json = JSON.stringify(market_object);
market = JSON.parse(market_json);
