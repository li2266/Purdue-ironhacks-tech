var geocoder;
var map;
var markers = new Array();
var infos = new Array();

google.maps.event.addDomListener(window,'load',initialize);

function initialize(){
	geocoder= new google.maps.Geocoder();

	var myLatlng = new google.maps.LatLng(40.7143528,-74.0059731);
	var myOptions={
		zoom:14,
		center:myLatlng,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById('gmap_canvas'),myOptions);
}

function clearOverlays(){
	if(markers){
		for(i in markers){
			markers[i].setMap(null);
		}
		markers=[];
		infos=[];
	}
}
function clearInfos(){
	if(infos){
		for(i in infos){
			if(infos[i].getMap()){
				infos[i].close();
			}
		}
	}
}

function findAddress(){
	var address = document.getElementById("gmap_where").value;
	geocoder.geocode({'address':address},function(results,status){
		if(status ==google.maps.GeocoderStatus.OK){
			var addrLocation =results[0].geometry.location;
			map.setCenter(addrLocation);
			document.getElementById('lat').value = results[0].geometry.location.lat();
			document.getElementById('lng').value = results[0].geometry.location.lng();
			var addrMarker = new google.maps.Marker({
				position: addrLocation,
				map: map,
				title: results[0].formatted_address,
				icon: 'marker.png'
			});

		}
		else{
			alert(status);
		}
	});
}






function findPlaces(){
	var type = document.getElementById("gmap_type").value;
	var radius = document.getElementById("gmap_radius").value;
	var keyword = document.getElementById("gmap_keyword").value;
	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
	var cur_location = new google.maps.LatLng(lat,lng);

	var request={
		location: cur_location,
		radius: radius,
		types: [type]
	};
	if(keyword){
		request.keyword = [keyword];
	}
	service = new google.maps.places.PlacesService(map);
	service.search(request,createMarkers);

}
function createMarkers(result,status){
	if(status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
		alert('location not found');
	}
	else if(status == google.maps.places.PlacesServiceStatus.OK){
		clearOverlays();
		for(var i = 0;i<result.length;i++){
			createMarker(result[i]);
		}
	}
}
function createMarker(obj){
	var mark =new google.maps.Marker({
		position:obj.geometry.location,
		map:map,
		title:obj.name
	});
	markers.push(mark);
	var infowindow = new google.maps.InfoWindow({
		content:'<img src="'+ obj.icon+'" /><font style="color:#000;">' + obj.name +
'<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
	});
	google.maps.event.addListener(mark,'click',function(){clearInfos();infowindow.open(map,mark);});
	infos.push(infowindow);
}





























