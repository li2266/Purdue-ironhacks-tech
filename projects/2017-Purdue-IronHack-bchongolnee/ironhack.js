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


var rating = d3.scale.linear()
                 .domain([3, d3.max(dataset, function(d) { return d["rating"]; })])
                 .range([padding, w - padding * 2]);

      //bar svg
      var bar = d3.select("#Tbar")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);

      //graph bar chart
      bar.selectAll("rect")
        .data(rating)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
          return 100+i*50;
        })
        .attr("y", function(d) {
          return 500-(d*9);
        })
        .attr("width", 30)
        .attr("height", function(d){
          return  d*9;
        })
        .attr("fill", function(d) {
          return "rgb(162,144,173)";
        })
        .attr("class", function(d,i){
          return i;
      });
      
      //coutries label
      bar.append("text")
        .attr("x", 105)
        .attr("y", 250)
        .text("US");
        
      bar.append("text")
        .attr("x", 148)
        .attr("y", 480)
        .text("Japan");
        
      bar.append("text")
        .attr("x", 195)
        .attr("y", 480)
        .text("Korea");
        
      bar.append("text")
        .attr("x", 245)
        .attr("y", 480)
        .text("China");
      //heading     
      bar.append("text")
        .attr("x", 150)
        .attr("y", 200)
        .text("# of Countries");
      })

/*var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv("data.csv", function(d) {
  d.population = +d.population;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; });
});
*/
var pie = new d3pie("pieChart", {
  "header": {
    "title": {
      "text": "Type of grocery stores",
      "fontSize": 22,
      "font": "verdana"
    },
    "subtitle": {
      "color": "#999999",
      "fontSize": 10,
      "font": "verdana"
    },
    "titleSubtitlePadding": 12
  },
  "footer": {
    "color": "#999999",
    "fontSize": 11,
    "font": "open sans",
    "location": "bottom-center"
  },
  "size": {
    "canvasHeight": 400,
    "canvasWidth": 590,
    "pieOuterRadius": "84%"
  },
  "data": {
    "content": [
      {
        "label": "Local",
        "value": 7,
        "color": "#b1370a"
      },
      {
        "label": "Chain",
        "value": 6,
        "color": "#1c4614"
      }
    ]
  },
  "labels": {
    "outer": {
      "format": "label-percentage2",
      "pieDistance": 32
    },
    "inner": {
      "format": "value"
    },
    "mainLabel": {
      "font": "verdana"
    },
    "percentage": {
      "color": "#e1e1e1",
      "font": "verdana",
      "decimalPlaces": 0
    },
    "value": {
      "color": "#e1e1e1",
      "font": "verdana"
    },
    "lines": {
      "enabled": true,
      "color": "#cccccc"
    },
    "truncation": {
      "enabled": true
    }
  },
  "effects": {
    "pullOutSegmentOnClick": {
      "effect": "linear",
      "speed": 400,
      "size": 8
    }
  },
  "callbacks": {
    "onClickSegment": null
  }
});



