1. Name of Application: NUTESY

2. Keywords: Desire, Nutrition, Price

3. In this application three datasets will be used.

  1. Primary dataset: Normals Monthly
   *Description: The 1981-2010 Normals comprise all climate normals using the thirty year period of temperature, degree days, precipitation, snowfall, snow depth, wind, etc. Data are organized into hourly, daily, monthly, seasonal and annual. This document describes the elements and layout of the Monthly Normals which are derived from a composite of climate records from numerous sources that were merged and then subjected to a suite of quality assurance reviews- The link of dataset is: 
   https://www.ncdc.noaa.gov/cdo-web/search?datasetid=NORMAL_MLY
   
  2. Food Environment Atlas
   *Description: Food environment factors--such as store/restaurant proximity, food prices, food and nutrition assistance programs, and community characteristics--interact to influence food choices and diet quality. Research is beginning to document the complexity of these interactions, but more is needed to identify causal relationships and effective policy interventions. The objectives of the Atlas are to assemble statistics on food environment indicators to stimulate research on the determinants of food choices and diet quality, and to provide a spatial overview of a community's ability to access healthy food and its success in doing so.- The link of dataset is:
   https://catalog.data.gov/dataset/food-environment-atlas-f4a22
   
  3. VegScape - Vegetative Condition Explorer  
   *Description: VegScape is a geospatial data service which offers automated updates of vegetative condition at daily, weekly, and biweekly intervals. VegScape delivers interactive vegetation indices that enable quantification of U.S. crop conditions for exploring, visualizing, querying, and disseminating via interactive maps.-The link of dataset is:
   https://catalog.data.gov/dataset/vegscape-vegetative-condition-explorer
   
4. Project Description:
   *In this application first of all the user has to enter his/her desired ingredients of the food which should include vegetables. After that according to the climate situation based on dataset 1 and based on the condition of the vegetables obtained from dataset 3, the best option combining food prices and nutrition assistance would be recommended according to dataset2.
 

  <!DOCTYPE html>
<html>

<body>

<div id="map" style="width:100%;height:500px"></div>

<script>
function myMap() {
  var myCenter = new google.maps.LatLng(40.425869,-86.908066);
  
   var fresh = new google.maps.LatLng(40.432543,-86.914825);
   var payless = new google.maps.LatLng(40.455270,-86.917498);
   var MarshSupermarket = new google.maps.LatLng(40.451882,-86.913977);
   var KhyberSupermarket = new google.maps.LatLng(40.425563,-86.907349);
   var WalmartSupercenter = new google.maps.LatLng(40.456955,-86.932941);
   var MarshSupermarket = new google.maps.LatLng(40.451882,-86.913977);
   var ALDI = new google.maps.LatLng(40.453880,-86.908743);
   var CTMarket = new google.maps.LatLng(40.423513,-86.899523);
   
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 13};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:fresh});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:payless});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:MarshSupermarket});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:KhyberSupermarket});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:WalmartSupercenter});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:MarshSupermarket});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:ALDI});
  marker.setMap(map);
  var marker = new google.maps.Marker({position:C&TMarket});
  marker.setMap(map);
  
  
  
  google.maps.event.addListener(marker,'click',function() {
    var infowindow = new google.maps.InfoWindow({
      content:"Veg avai!"
    });
  infowindow.open(map,marker);
  });
}

</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU&callback=myMap"></script>


</body>
</html>
   