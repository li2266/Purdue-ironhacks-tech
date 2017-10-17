function getfresh_num() 
  {
      var f = document.getElementById("freshness").value;
      document.getElementById("freshness-demo").innerHTML = f;
  }

function getprice_num() 
  {
      var p = document.getElementById("price").value;
      document.getElementById("price-demo").innerHTML = p;
  }
/*function initMap() 
  {
        var uluru = {lat: 40.428, lng: -86.904};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
       var kmzLayer = new google.maps.KmlLayer('stores.kmz');
    kmzLayer.setMap(map);
     }*/

// get climate data- DOESN'T WORK YET - please help
/*$(document).ready(function(){

  $("#id_btn5").click(function(){
    $.ajax({ 
      type:"GET",
      url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?datatypeid=TOBS",  
      headers:{token:"KTrjttqqgttGxiMxsnMpcZgFngzJazJw" }, 
      dataType: 'json',
      success:function(data)
      {
        console.log(data);
        document.getElementById("NOAA").innerHTML = data;
      }
  });
  })
});*/
$("#testbtn").click(function(){
  $.ajax(
    {
    type:"GET",
    url: "http://quickstats.nass.usda.gov/api/api_GET/?key=AC6D780C-6486-3EAD-ADB1-4E2AE1E937CD&year=2017&freq_desc=POINT IN TIME&state_alpha=IN&format=JSON",
    dataType: 'jsonp',
    success:function(data)
      {
        console.log(data);
      }
  });
});
$("#weather").click(function(){
  $.ajax({
    type:"GET",
    url:"https://api.weather.gov/points/40.4247,-86.911/forecast",
    dataType: 'json',
    success:function(data){
    console.log(data);
    }
  });
});

//bar graph
  var w = 1000;
  var h = 700;
  var padding = 75;



d3.csv("stores.csv", function(error, dataset) {
        console.log(error);
        console.log(dataset);
  
        console.log(dataset);
        dataset.forEach(function(d){
          d.rating = +d.rating;
          });

var rating = [4.3, 3.8, 3.9, 4.2, 3.8, 4.6, 4.2, 4.8, 4.5, 4.1, 4.5, 4.7, 4.3]
var restaurant = ['Meijer', 'Walmart', 'Asia Market', 'Payless Super Market', 'Marsh Super Market', 'ALDI', 'Fresh City Market', 'Khyber Super Market', 'L A Village Food Mart', 'C&T Market', 'Better World Market', 'City Foods', 'Lafayette Farmers Market'] 
      //bar svg
      var bar = d3.select("#Tbar")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500);
      // tooltip svg
      var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

      //graph bar chart
      bar.selectAll("rect")
        .data(rating)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
          return 15+i*50;
        })
        .attr("y", function(d) {
          return 200-(d*35);
        })
        .attr("width", 30)
        .attr("height", function(d){
          return  20+d*35;
        })
        .attr("fill", function(d) {
          return "#E8656E";
        })
        .attr("class", function(d,i){
        return i;
        })
        .on("mouseover", function(d,i){
          console.log(rating[i]);
           tooltip.text("TEST");
           tooltip.style("visibility", "visible");
            tooltip.html(rating[i])
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
           })
        .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");
        

      });
      //label
      bar.selectAll("text")
         .data(rating)
         .enter()
         .append("text")
         .text(function(d) {
            return d;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
            return 30+i*50;
         })
         .attr("y", function(d) {
            return 200-(d*35);
         })
         .attr("font-family", "arial")
         .attr("font-size", "11px")
         .attr("fill", "white");

      })
/*var name = d3.select(".name")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500);

name.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("class", "text")
        .attr("x", 900)
        .attr("y", function(d, i) { return (i*40)+20})
                .text(function(d,i){
                    return name[i]
                });
        
$( ".0" ).mouseover(function(){
      lable(".0");
    });
    $( ".0" ).mouseout(function(){
      lable_none();
    });

function lable(bar_num){
       $
    }
*/
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
    ['Reason', 'Percentage'],
    ['Chain', 6],
    ['Local', 7]
    ]);

    var options = {
    title: 'Type of stores that exist'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}
