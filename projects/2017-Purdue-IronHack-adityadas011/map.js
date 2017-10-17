function initializeMap(){
                var mapDiv = document.getElementById('googlemap');
                var map = new google.maps.Map(mapDiv, {
                        center: {lat: 40.4227, lng: -86.9105}, zoom: 12});
                var marker1 = new google.maps.Marker({ 
                    position: {lat: 40.461469, lng: -86.915836},
                        map: map,
                    title: 'West Lafayette Farmers Markert'});
                var content1 = '<div id = "content1"><div id = "site1"></div> <h3>West Lafayette Farmers Market</h3> <div id = "body1"> <p><a href = "http://maps.google.com/maps?daddr=40.461469,+-86.915836+(3.6+West+Lafayette+Farmers+Market)&hl=en" target = "_blank">Directions</a><br><br></div></div>';
                var infowindow1 = new google.maps.InfoWindow({content: content1});
                    google.maps.event.addListener(marker1, 'click', function() {infowindow1.open(map, marker1);});
                var marker2 = new google.maps.Marker({ 
                    position: {lat: 40.4450, lng: -86.9136},
                        map: map,
                    title: 'Sagamore West Farmers Market'});
                var contentString2 = '<div id = "content2"><div id = "siteNotice2"></div> <h3>Sagamore West Farmers Market</h3> <div id = "bodyContent2"> <p><a href = "http://maps.google.com/maps?daddr=40.4445,+-86.9136+(4.5+Sagamore+West+Farmers+Market)&hl=en" target = "_blank">Directions</a><br><br></div></div>';
                var infowindow2 = new google.maps.InfoWindow({content: contentString2});
                    google.maps.event.addListener(marker2, 'click', function() {infowindow2.open(map, marker2);});
                var marker3 = new google.maps.Marker({
                    position: {lat: 40.425830, lng: -86.914239},
                        map: map,
                    title: 'Purdue Farmers Market'});
                var contentString3 = '<div id = "content3"><div id = "siteNotice3"></div> <h3>Purdue Farmers Market</h3> <div id = "bodyContent3"> <p><a href = "http://maps.google.com/maps?daddr=40.425830,+-86.914239+(5.6+Purdue+Farmers+Market)&hl=en" target = "_blank">Directions</a><br><br></div></div>';
                var infowindow3 = new google.maps.InfoWindow({content: contentString3});
                    google.maps.event.addListener(marker3, 'click', function() {infowindow3.open(map, marker3);});
                var marker4 = new google.maps.Marker({ 
                    position: {lat: 40.417715, lng: -86.891895},
                        map: map,
                    title: 'Historic Lafayette Farmers Market'})
                var contentString4 = '<div id = "content2"><div id = "siteNotice2"></div> <h3>Historic Lafayette Farmers Market</h3> <div id = "bodyContent2"> <p><a href = "http://maps.google.com/maps?daddr=40.417715,+-86.891895+(6.7+Historic+Lafayette+Farmers+Market)&hl=en" target = "_blank">Directions</a><br><br></div></div>';
                var infowindow4 = new google.maps.InfoWindow({content: contentString4});
                    google.maps.event.addListener(marker4, 'click', function() {infowindow4.open(map, marker4);});
                }
