// Some global variables
var currentGeolocation;
var currentZIP = 47906;
var localMarkets = [];
var localMarketDetails = [];
var distThreshold = 10; // max prefered distance of local market

//var myIconPath = "M27.648 -41.399q0 -3.816 -2.7 -6.516t-6.516 -2.7 -6.516 2.7 -2.7 6.516 2.7 6.516 6.516 2.7 6.516 -2.7 2.7 -6.516zm9.216 0q0 3.924 -1.188 6.444l-13.104 27.864q-0.576 1.188 -1.71 1.872t-2.43 0.684 -2.43 -0.684 -1.674 -1.872l-13.14 -27.864q-1.188 -2.52 -1.188 -6.444 0 -7.632 5.4 -13.032t13.032 -5.4 13.032 5.4 5.4 13.032z"
var myIconPath = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
var homeIconPath = "M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z";
// Function to work with the markets
function extractMarkets(markets){
  var dfrd = $.Deferred();
  for (var key in markets) {
    var results = markets[key];
    localMarkets = results;
    for (var i = 0; i < results.length; i++){
      var res = results[i];
      for(var k in res){
        //console.log(k + " : " + res[k]);
      }
      //detailedInfo.done(handleDetailedMarkets(dtInfo));
    }
  }
  dfrd.resolve();
  return dfrd.promise();
}


// Function to work with the detailed information about the markets
function extractMarketDetails(dtlInfo,locMark){
  for (var key in dtlInfo){
    var dtlResults = dtlInfo[key];
    localMarketDetails.push({label: locMark["id"], name: locMark["marketname"], value: dtlResults, marker: null});
    for(var i = 0; i < dtlResults.length; i++){
      var dtRes = dtlResults[i];
    }
  }
}


// A function to extract lat/long coordinates from a googlemap URL
function getLatLng(url){
  var result = {lat:0, lng:0};
  var regex = new RegExp('q=(.*)%2C%20(.*)%20');
  var latLngmatch = url.match(regex);
  result.lat = +latLngmatch[1];
  result.lng = +latLngmatch[2];
  return result;
}

// A function to extract the distance of a local market from the current possition
function getDistName(address){
  var result = {dist:0, name:""};
  var regex = new RegExp('(\\d*.\\d*) (.*)');
  var regMatch = address.match(regex);
  result.dist = +regMatch[1];
  result.name = regMatch[2];
  return result;
}


// A function to prepare infowindow content
function prepareInfoContent(type,marker){
  var result = '';
  if (type === 'home'){
    // The heading part
    /*result += "<div class='row'>";
    result += "<div class='col s12'>";
    result += "<div class='iw-title'>Your Place</div>";
    result += "<div class='vert-space10px'></div>";
    result += "</div></div>";*/

    // The body
    result += "<div class='row'>";
    //result += "<div class='col s6'>";
    //result += '<div class = "row">';
    result += '<div id = "w-icon" class = "col s12">';
    result += "Loading...";
    result += '</div></div>';
    result += '<div class = "row">';
    result += '<div id = "w-plc" class = "col s12">';
    result += '</div></div>';
    result += '<div class = "row">';
    result += "<div class='vert-space10px'></div>";
    result += '<div id = "w-more-hum" class = "col s5 m5 l5">';
    result += '</div>';
    result += '<div id = "w-more-wnd" class = "col s7 m7 l7">';
    result += '</div>';
    /*result += '<div id = "w-more-sr" class = "col s3 m3 l3">';
    result += '</div>';
    result += '<div id = "w-more-ss" class = "col s3 m3 l3">';
    result += '</div>';*/
    result += '</div>';
    //result += '</div>';
    //result += "<div class='col s6 m6 l6'>";
    //result += "Some thing here";
    //result += "</div></div>";
  }else if (type === 'market'){
    // The heading part
    result += "<div class='row'>";
    result += "<div class='col s12'>";
    result += "<div class='iw-title'>" + marker.getTitle() + "&nbsp;&nbsp;&nbsp;&nbsp;</div>";
    result += "<div class='vert-space10px'></div>";
    result += "</div></div>";

    // The body
    result += "<div class='row'>";
    result += "<div id='mk-rate' class='col s12'>";
    result += "Loading...";
    result += "<div class='vert-space10px'></div>";
    result += "</div></div>";

    result += "<div class='row'>";
    result += "<div id='mk-info' class='col s7' style='text-align: left !important;'>";
    result += "</div>";
    result += "<div id='mk-pic' class='col s5'>";
    result += "</div></div>";
  }
  return result;
}



// A function to get the current weather of a position
function getWeather(loc){
  $.simpleWeather({
    location: loc.lat + ',' + loc.lng,
     woeid: '',
    unit: 'f',
    success: function(weather){
      var h = '<h4>&nbsp;<i class = "wi wi-yahoo-' + weather.code + '"></i> &nbsp;&nbsp;' +
        weather.temp + '&deg;' + weather.units.temp + '</h4>';
      $("#w-icon").html(h);

      h = '<div>' + weather.currently + ' in ' + weather.city + 
        ', ' + weather.region + '</div>';
      $("#w-plc").html(h);
      
      h = '<div><i class="wi wi-humidity">&nbsp;' + weather.humidity  + '</div>'; 
      $("#w-more-hum").html(h);
      
      h = '<div><i class="wi wi-strong-wind">&nbsp;' + weather.wind.speed + '&nbsp;' + weather.units.speed + '</div>'; 
      $("#w-more-wnd").html(h);

     /* h = '<div><i class="wi wi-sunrise">&nbsp;' + weather.sunrise + '</div>'; 
      $("#w-more-sr").html(h);

      h = '<div><i class="wi wi-sunset">&nbsp;' + weather.sunset  + '</div>'; 
      $("#w-more-ss").html(h);*/
    }
  });
}


// A function to get detailed information about a market from Google
// Getting the information, this function place it in the corresponding
// in))window
function getDtlInfo(map,marker){
  var request = {
    location: marker.getPosition(),
    radius: 10,
    query: marker.getTitle()
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, function(results, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
      var dtReq = {
        placeId: results[0].place_id
      };
      var dtServ = new google.maps.places.PlacesService(map);
      dtServ.getDetails(dtReq, function(place,status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
          var rate100 = 0;
          if(place.rating)
            rate100 = +place.rating * 20;
          $("#mk-rate").html('');
          var starWidth = "<style>.stars-container:after { width: " + rate100 + "%} </style>"; 
          $("<span class='stars-container'>")
            .text("★★★★★")
            .append($(starWidth))
            .appendTo($("#mk-rate"));

          var h = '<ul>';
          h += '<li> <i class="tiny material-icons">email</i> &nbsp;&nbsp;' + place.formatted_address;
          h += '<li>&nbsp;';
          h += '<li> <i class="tiny material-icons">phone</i> &nbsp;&nbsp;' + place.formatted_phone_number;
          h += '<li>&nbsp;';
          var website = 'Now webpage is available.'
          if(place.website){
            website = '<a href="' + place.website + '" target="_blank"> The webpage of this market </a>';
          }
          h += '<li> <i class="tiny material-icons">language</i> &nbsp;&nbsp;' + website;
          h += '<li>&nbsp;';
          h += '<li> <i class="tiny material-icons">query_builder</i> &nbsp;&nbsp;';
          var op = place.opening_hours;
          if(op){
            if(op.open_now){
              h += op.periods[0].open.hours + ':' +
                op.periods[0].open.minutes  + ' - ' +
                op.periods[0].close.hours + ':' +
                op.periods[0].close.minutes;
            }else{
              h += '<span style="color:pink;">Closed Now</span>';
            }
          }else{
              h += 'Hours are not available';
          }
          h += '</ul>';
          $("#mk-info").html(h);

          var photos = place.photos;
          if(photos){
            var phurl = photos[0].getUrl({'maxWidth' : Math.floor(photos[0].width/10), 
              'maxHeight' : Math.floor(photos[0].height/20)});
            var orgphurl = photos[0].getUrl({'maxWidth' : photos[0].width, 
              'maxHeight' : photos[0].height});
            var h = '<ul><li><a href="' + orgphurl + '" target="_blank">' + 
              '<img src="' + phurl + '"width=190 height=115></a></li></ul>';
            $("#mk-pic").html(h);
          }else{
            var h = '<ul><li><img src="assets/img/img-unavailable.png" width=190 height=115></li></ul>';
            $("#mk-pic").html(h);
          }
        }else{
          $("#mk-rate").html('Unable to get details.');
        }
      });
    }
  });
}



// This function is going to fetch climate data from NCDC
  function getClimateData(ZIP){
    $.ajax({
      type: "GET",
      url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=ZIP:" + ZIP + "&startdate=2016-01-01&enddate=2017-04-01&stationid=GHCND:US1INTP0009&datacategoryid=PRCP&limit=1000",
      headers: {
        token: "KeGGpiEiDnciWbopCuZwXvPeslqfLFfT"
      },
      dataType: 'json',
      success: function(data){
        console.log("Yay!");
        console.log(data);
      },
      error: function(error){
        console.log("Oh My!");
        console.log(error);
      }
    });
  }


