//Author: Zhenzhi Xu
//Project: Eat Smart

//initiate map
var LatLngInit;
var mapResult;
var mapCanvasResult;
var mapOptionsResult;
var markerResult;
var marketId = []; //returned from the API
var allLatlng = []; //returned from the API
var allMarkers = []; //returned from the API
var marketName = []; //returned from the API
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];

//initiate direction
var distanceDriving = [];
var durationDriving = [];
var distanceWalking = [];
var durationWalking = [];
//var LatLng2;

//bullet chart
var rateSeason = [];


function myMap() {
	var myCenter = new google.maps.LatLng(40.424758,-86.9114603);
	var mapCanvas = document.getElementById("Userlocation");
	var mapOptions = {center: myCenter, zoom: 18};
	var map = new google.maps.Map(mapCanvas, mapOptions);
			
	LatLngInit = new google.maps.LatLng(40.424758,-86.9114603);
	mapCanvasResult = document.getElementById("Resultlocation");
	mapOptionsResult = {center: LatLngInit, zoom: 18};
	mapResult = new google.maps.Map(mapCanvasResult, mapOptionsResult);
	markerResult = new google.maps.Marker({position:LatLngInit});
	markerResult.setMap(mapResult);

	// Create the search box and link it to the UI element.
	var input = document.getElementById('SearchInput');
	var searchBox = new google.maps.places.SearchBox(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
		// [START region_getplaces]
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
				  return;
				}

		// Clear out the old markers.
		markers.forEach(function(marker) {
				  marker.setMap(null);
				});
		markers = [];

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			// Create a marker for each place.
			$('#ConfirmLoc').html('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
			LatLngInit = place.geometry.location;
				  
			markers.push(new google.maps.Marker({
					map: map,
					title: place.name,
					position: place.geometry.location
				  }));
				  
			if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				  } else {
					bounds.extend(place.geometry.location);
				  }
		});
		map.fitBounds(bounds);
		
	});
			  
}

function Generate(){
	
	$("html,body").animate({scrollTop: $("#ResultSec").offset().top}, 100);
	
	mapOptionsResult = {center: LatLngInit, zoom: 18};
	markerResult.setMap(null);
	markerResult = new google.maps.Marker({position:LatLngInit});
	markerResult.setMap(mapResult);
	
	
	//json format data resource url 
	var USDAurl = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906";
	//Use the zip code and return all market ids in area.
	
	var NCDCurl = "";
	


	$.ajax({
		
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: USDAurl,
		dataType: 'jsonp',
		success: function (data) {
			
			//Get the farmer's market in Lafayette and West Lafayette
			for(var i = 0;i <= 3; i++){
				marketId.push(data.results[i].id);
				marketName.push(data.results[i].marketname);
			}
								
			console.log(marketName);
					
			var counter = 0;
			
			$.each(marketId, function (k, v){
				$.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					// submit a get request to the restful service mktDetail.
					url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + v,
					dataType: 'jsonp',

					success: function (data) {

						for (var key in data) {

							var results = data[key];
								
							console.log(results);

							var googleLink = results['GoogleLink'];
							var latLong = decodeURIComponent(googleLink.substring(googleLink.indexOf("=")+1, googleLink.lastIndexOf("(")));
								
							var split = latLong.split(',');
							var latitude = split[0];
							var longitude = split[1];
							var imageFM = 'image/icons/png/PocketMap.png';
							
							var scheduleTemp = results['Schedule'];
							var split2 = scheduleTemp.split('<br>');
							var schedule = split2[0];
								
							//set the markers.	  
							var myLatlng = new google.maps.LatLng(latitude,longitude);
						  
							allMarkers = new google.maps.Marker({
								position: myLatlng,
								map: mapResult,
								title: marketName[counter],
								icon: imageFM
							});

							//put all lat long in array
							allLatlng.push(myLatlng);
									
							//Put the marketrs in an array
							tempMarkerHolder.push(allMarkers);
							

		
							
							google.maps.event.addListener(allMarkers, 'click', function () {
								
								//Call Google direction API to get the direction & duration for driving
								var service = new google.maps.DistanceMatrixService();
								service.getDistanceMatrix({
									origins: [LatLngInit],
									destinations: [myLatlng],
									travelMode: google.maps.TravelMode.DRIVING,
									unitSystem: google.maps.UnitSystem.METRIC,
									avoidHighways: false,
									avoidTolls: false
								}, function (response, status) {
									if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
										console.log(response);
										distanceDriving = response.rows[0].elements[0].distance.text;
										durationDriving = response.rows[0].elements[0].duration.text;
										console.log("D " + distanceDriving);
										console.log("D " + durationDriving);
										$('#driving').html('<img src="image/icons/png/Drive.png" height=20px width=20px> <strong>Distance:</strong> ' + distanceDriving + ' <strong>Duration:</strong> ' + durationDriving);
									} else {
										alert("Unable to find the distance via road.");
									}
								});
					
								//Call Google direction API to get the direction & duration for driving
								service.getDistanceMatrix({
									origins: [LatLngInit],
									destinations: [myLatlng],
									travelMode: google.maps.TravelMode.WALKING,
									unitSystem: google.maps.UnitSystem.METRIC,
									avoidHighways: false,
									avoidTolls: false
								}, function (response, status) {
									if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
										console.log(response);
										distanceWalking = response.rows[0].elements[0].distance.text;
										durationWalking = response.rows[0].elements[0].duration.text;
										$('#walking').html('<img src="image/icons/png/Walk.png" height=20px width=20px>  <strong>Distance:</strong> ' + distanceWalking + ' <strong>Duration:</strong> ' + durationWalking);
										
									} else {
										alert("Unable to find the distance via road.");
									}
								});
									
								
								$('#MarketName').html(this.title);
								$('#Address').html('<strong>[Address]</strong> ' + results['Address']);
								//$('#Products').html('<div><p>Products: ' + results['Products'] + '</p><br></div>');
								$('#Schedule').html('<strong>[Hours]</strong> ' + schedule);
								$("#Distance").html('<strong>[Direction]</strong>');
				
							});		
							
							counter++;
						};
								
						
								
						
						//  Make an array of the LatLng's of the markers you want to show
						//  Create a new viewpoint bound
						var bounds = new google.maps.LatLngBounds ();
						//  Go through each...
						for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
							//  And increase the bounds to take this point
							bounds.extend (allLatlng[i]);
						}
						//  Fit these bounds to the map
						mapResult.fitBounds (bounds);
										
					}
					
					
				});			
				
							
			}); //end .each
		}
	});
	
	if($('#Onion').prop('checked')){
		SetD3("#OnionR","Onion");
		console.log("Onion is " + $('#Onion').prop('checked'));
	}else{
		$('#OnionRname').html('');
		$('#OnionRSeason').html('');
		$('#OnionRClimate').html('');
		$('#OnionRPrice').html('');
	}
	
	if($('#Tomato').prop('checked')){
		SetD3("#TomatoR","Tomato");
		console.log("Cabbage is " + $('#Tomato').prop('checked'));
	}else{
		$('#TomatoRname').html('');
		$('#TomatoRSeason').html('');
		$('#TomatoRClimate').html('');
		$('#TomatoRPrice').html('');
	}
	
	if($('#Cabbage').prop('checked')){
		SetD3("#CabbageR","Cabbage");
		console.log("Cabbage is " + ($('#Cabbage').prop('checked')));
	}else{
		$('#CabbageRname').html('');
		$('#CabbageRSeason').html('');
		$('#CabbageRClimate').html('');
		$('#CabbageRPrice').html('');
	}

	if($('#Pepper').prop('checked')){
		SetD3("#PepperR","Pepper");
		console.log("Pepper is " + $('#Pepper').prop('checked'));
	}else{
		$('#PepperRname').html('');
		$('#PepperRSeason').html('');
		$('#PepperRClimate').html('');
		$('#PepperRPrice').html('');
	}

	if($('#Celery').prop('checked')){
		SetD3("#CeleryR","Celery");
		console.log("Celery is " + $('#Celery').prop('checked'));
	}else{
		$('#CeleryRname').html('');
		$('#CeleryRSeason').html('');
		$('#CeleryRClimate').html('');
		$('#CeleryRPrice').html('');
	}

	if($('#Lettuce').prop('checked')){
		SetD3("#LettuceR","Lettuce");
		console.log("Lettuce is " + $('#Lettuce').prop('checked'));
	}else{
		$('#LettuceRname').html('');
		$('#LettuceRSeason').html('');
		$('#LettuceRClimate').html('');
		$('#LettuceRPrice').html('');
	}

	if($('#Carrot').prop('checked')){
		SetD3("#CarrotR","Carrot");
		console.log("Carrot is " + $('#Carrot').prop('checked'));
	}else{
		$('#CarrotRname').html('');
		$('#CarrotRSeason').html('');
		$('#CarrotRClimate').html('');
		$('#CarrotRPrice').html('');
	}	
	
	if($('#Eggplant').prop('checked')){
		SetD3("#EggplantR","Eggplant");
		console.log("Eggplant is " + $('#Eggplant').prop('checked'));
	}else{
		$('#EggplantRname').html('');
		$('#EggplantRSeason').html('');
		$('#EggplantRClimate').html('');
		$('#EggplantRPrice').html('');
	}
	//SetD3();

}




function SetD3(div,name){
	//console.log(dataChart);
	//var divtmp = div + 'Season';
	//var nametmp = name;

	$(div + "name").html(name);
	
	//update season
	SetSeason(div,name);
	SetClimate(div,name)


}

function SetSeason(div,name){
	$.ajax({
	    type: "GET",
	    url: "csv/season.csv",
	    dataType: "text",
	    success: function(data) { 
			var dat = $.csv.toObjects(data);
	        console.log(dat[0].Name);
	        $.each(dat,function(k, v) {
	        	console.log(k);
	        	console.log(v);
	        	if(v.Name == name){
	        		/////////////////////
	        		var margin = {top: 5, right: 40, bottom: 20, left: 120},
					width = 500 - margin.left - margin.right,
					height = 50 - margin.top - margin.bottom;

					var chart = d3.bullet()
					.width(width)
					.height(height);
	        		/////////////////////
	        		var dataChart = [
					  {"title":"Season","subtitle":"Seasonality Charts","ranges":[0,0,10],"measures":[0,10],"markers":[0]}
					];
	        		console.log(div + "Season");
	        		console.log(v.Name + " is " + v.Apr);
	        		rateSeason[0] = v.Apr;
	        		dataChart[0].markers = rateSeason;
	        		console.log("Season done!!");
	        		////////////////
	        		var svg = d3.select(div + "Season").selectAll("svg")
					  .data(dataChart)
					.enter().append("svg")
					  .attr("class", "bullet")
					  .attr("width", width + margin.left + margin.right)
					  .attr("height", height + margin.top + margin.bottom)
					.append("g")
					  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					  .call(chart);

					  var title = svg.append("g")
						  .style("text-anchor", "end")
						  .attr("transform", "translate(-6," + height / 2 + ")");

					  title.append("text")
						  .attr("class", "title")
						  .text(function(d) { return d.title; });

					  title.append("text")
						  .attr("class", "subtitle")
						  .attr("dy", "1em")
						  .text(function(d) { return d.subtitle; });

	        	}
	        });
	    }
	});
}

function SetClimate(div,name){
	$.ajax({
	    type: "GET",
	    url: "csv/grow.csv",
	    dataType: "text",
	    success: function(data) { 
			var dat = $.csv.toObjects(data);
			var tmin;
	        var tmax;
	        var tavg;
	        console.log(dat[0].Name);
	        $.each(dat,function(k, v) {

	        	console.log(k);
	        	console.log(v);
	        	if(v.Name == name){
	        		
	        		$.ajax({
	        			type:"get",
	        			url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&stationid=GHCND:USC00129430&locationid=ZIP:47906&units=standard&startdate=2016-03-15&enddate=2016-04-15",
	        			headers:{
	        				"token": "LjddxCbePddEhRNBUOUickPrpZImPZCV"
	        			}
	        		}).done(function(data){
					    console.log(data);
					    for (var key in data.results) {
					    	if(data.results[key].datatype == "EMXT"){
					    		tmax = data.results[key].value;
					    		console.log(data.results[key]);
					    	}
					    	if(data.results[key].datatype == "EMNT"){
					    		tmin = data.results[key].value;
					    		console.log(data.results[key]);
					    	}

							//var googleLink = results['GoogleLink'];
						}
						console.log(tmax+" test "+tmin); 
						tavg = (tmax + tmin)/2;
						console.log(tavg);

						var slope;
						var cor;
						var PercentCM = [];

						if(tavg >= v.Temp && tavg <= v.Highest){
							slope = 10/(v.Temp - v.Highest);
							cor = -slope*v.Highest;
							PercentCM[0] = slope*tavg + cor;
						}else
						if(tavg <= v.Temp && tavg >= v.Lowest){
							slope = 10/(v.Temp - v.Lowest);
							cor = -slope*v.Lowest;
							PercentCM[0] = slope*tavg + cor;
						}else{
							PercentCM[0] = 0;
						}

						console.log(PercentCM[0]);

						var margin = {top: 5, right: 40, bottom: 20, left: 120},
						width = 500 - margin.left - margin.right,
						height = 50 - margin.top - margin.bottom;

						var chart = d3.bullet()
						.width(width)
						.height(height);
		        		/////////////////////
		        		var dataChart = [
						  {"title":"Climate","subtitle":"Climate suitability","ranges":[0,0,10],"measures":[0,10],"markers":[0]}
						];
		        		console.log(div + "Climate");
		        		console.log(v.Name + " is " + v.Temp);
		        		dataChart[0].markers = PercentCM;
		        		console.log("Climate done!!");
		        		////////////////
		        		var svg = d3.select(div + "Climate").selectAll("svg")
						  .data(dataChart)
						.enter().append("svg")
						  .attr("class", "bullet")
						  .attr("width", width + margin.left + margin.right)
						  .attr("height", height + margin.top + margin.bottom)
						.append("g")
						  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
						  .call(chart);

						  var title = svg.append("g")
							  .style("text-anchor", "end")
							  .attr("transform", "translate(-6," + height / 2 + ")");

						  title.append("text")
							  .attr("class", "title")
							  .text(function(d) { return d.title; });

						  title.append("text")
							  .attr("class", "subtitle")
							  .attr("dy", "1em")
							  .text(function(d) { return d.subtitle; });
					}); 
	        		

	        	}
	        });
	    }
	});
}