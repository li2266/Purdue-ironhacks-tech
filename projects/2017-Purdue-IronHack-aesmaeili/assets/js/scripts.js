$(document).ready(function(){
  // Variable initialization
  var pmu = {lat:40.424791, lng: -86.911548};
  currentGeolocation = pmu;
  var  activeMarker = null;
  // View initialization
  $(".card-content").hide();


  // Initializing Map area
  var map;
  //var lafArea = {lat:40.411313, lng:-86.901334};
  var mapOptions = {
    center: pmu,
    clickableIcons: false,
    zoom: 14
  };
  map = new google.maps.Map(document.getElementById('main-map'),mapOptions);

  // Making a map marker
  var currPosMarker = new google.maps.Marker({
    position: pmu,
    icon: {
      path: homeIconPath,
      scale: 1.5,
      fillColor: '#00e676',
      fillOpacity: 0.85,
      strokeColor: '',
      strokeWight: 0,
      anchor: new google.maps.Point(6,18)
    },
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Your position"
  });

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      var curr = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      currPosMarker.setPosition(curr);
      map.setCenter(curr);
      currentGeolocation.lat = curr.lat();
      currentGeolocation.lng = curr.lng();
      currentZIP = pos.address.postalCode;
    }, function(error) {
      currPosMarker.setPosition(pmu);
      Materialize.toast('Unable to access your precise location',1000);
    });
  }
  


  // FOR FUTURE: In the following I have defined one single infowindow for all markers
  // This causes only one indowin to be active at any moment. If I change my
  // mind later, I can repeat the process below to define different infowindow
  // for the markers with their own style.

    // Preparing a dark theme for the infowin
    var darkInfoWin = new google.maps.InfoWindow({
      content: '',
      maxWidth: 500
    }); 

    google.maps.event.addListener(darkInfoWin, 'domready', function(){
      var iwOuter = $('.gm-style-iw');
      var iwBackground = iwOuter.prev();
      var iwCloseBtn = iwOuter.next();

      // The shadow of the info window
      iwBackground.children(':nth-child(2)').css({'display':'none'});
      // The info window itself
      iwBackground.children(':nth-child(4)').css({'background-color':'#333','border-radius':'4px','box-shadow':'8px 8px 16px #222'});
      // The arrow of the infowindow
      iwBackground.children(':nth-child(3)').find('div').children().css({'background-color':'#555'});
      // The shaddow of the arrow
      iwBackground.children(':nth-child(1)').css({'display':'none'});
      // Styling the close button
      iwCloseBtn.css({
        'border-radius': '13px',
      }); 
    });

    
    // Defining some map event listeners
  currPosMarker.addListener('click',function(){
    // Resetting any currently active marker to its default state
    if(activeMarker != null){
      var defaultIcon = activeMarker.getIcon();
      defaultIcon.scale -= .5;
      activeMarker.setIcon(defaultIcon);
      activeMarker = null;
    }

    $(".card-content").show(400);
    activeMarker = this;
    var bigIcon = this.getIcon();
    bigIcon.scale += .5;
    this.setIcon(bigIcon);

    darkInfoWin.setContent(prepareInfoContent('home',activeMarker));
    getWeather(currentGeolocation);
    darkInfoWin.open(map,currPosMarker);
  });

  map.addListener('click', function(e){
    if(activeMarker != null){
      if(!e.latLng.equals(activeMarker.getPosition())){
        $(".card-content").slideUp();
        var defaultIcon = activeMarker.getIcon();
        defaultIcon.scale -= .5;
        activeMarker.setIcon(defaultIcon);
        activeMarker = null;
        darkInfoWin.close();
      }
    }
  });

  // Initializing the View
  $("#distance").attr("value", distThreshold);
  $("#distance").on('change',function(){
    distThreshold = this.value;
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < localMarketDetails.length; i ++){
      if(localMarketDetails[i].marker.dist > distThreshold){
        localMarketDetails[i].marker.setVisible(false);
      }else{
        localMarketDetails[i].marker.setVisible(true);
        bounds.extend(localMarketDetails[i].marker.getPosition());
      }
    }
    map.fitBounds(bounds);
  });

  // Materialize events

  $('.sidebar-collapse').sideNav({
    edge: 'left',
  });



  $(".menu-sidebar-collapse").sideNav({
    edge: 'left',
    //menuWidth: 300,
    draggable: true
  });


  // Working with data:
  // First of all, let's get the list of local markets from USDA
  // This data will be based on the current location of the user
  // TODO: provide an option for the user to get the list based on zip code

  function getLocalMarkData(){
    var dfrd = $.Deferred();
    Materialize.toast('<span id="locMrkLd"> Loading local markets ...</span>',60000,'locMrkLding');
    var marketsData =  $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url:"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + currentGeolocation.lat+ "&lng=" + currentGeolocation.lng,
      dataType: 'jsonp',
      success: function(data){
        extractMarkets(data).done(function(){
          //setTimeout(function(){
            for (var i = 0; i < localMarkets.length; i++){
              currentMarket = localMarkets[i];
              var detailedInfo = $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url:"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + currentMarket["id"],
                dataType: 'jsonp',
                indexValue: i,
                success: function(dd){
                  extractMarketDetails(dd,localMarkets[this.indexValue]);
                  if (localMarkets.length === localMarketDetails.length){
                    $('.locMrkLding').fadeOut(1000);
                    dfrd.resolve();
                  }
                },
                fail: function(){
                  console.log("Failed to get detailed data");
                }
              });

            }
          //},100);

        });
      }

    });
    return dfrd.promise();
  }
  // Let's do something as soon as local market data are available
  getLocalMarkData().done(function (){
    for(var i = 0; i < localMarketDetails.length; i++){
      var marketPos = getLatLng(localMarketDetails[i]["value"]["GoogleLink"]);
      var marketDistName = getDistName(localMarketDetails[i]["name"]);
      var marketMarker = new google.maps.Marker({
        position: marketPos,
        icon: {
          path: myIconPath,
          scale: 1.5,
          fillColor: '#f50057',
          fillOpacity: 0.85,
          strokeColor: '',
          strokeWight: 0,
          anchor: new google.maps.Point(12,20)
        },
        map: map,
        animation: google.maps.Animation.DROP,
        title: marketDistName.name,
        dist: marketDistName.dist
      });
      localMarketDetails[i].marker = marketMarker;
      marketMarker.addListener('click',function(e){
        // Resetting any currently active marker to its default state
        if(activeMarker != null){
          var defaultIcon = activeMarker.getIcon();
          defaultIcon.scale -= .5;
          activeMarker.setIcon(defaultIcon);
          activeMarker = null;
        }
        $(".card-content").show(400);
        activeMarker = this;
        var bigIcon = this.getIcon();
        bigIcon.scale += .5;
        this.setIcon(bigIcon);

        darkInfoWin.setContent(prepareInfoContent('market',activeMarker)); 
        getDtlInfo(map,activeMarker);
        darkInfoWin.open(map,this);
      });
    }
  });


});
