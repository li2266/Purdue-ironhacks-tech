Project name: EatSmart

Keyword: climate; local farm market; season

This app is a Web App to help people find freshest and cheapest vegetable in West Lafayette/Lafayette.
The app combines Google Map API with open datasets to help people figure out when and where to buy best vegetables.
The features it will cover include open hour, distance and transportation time, season of each vegetable, etc.

Dataset: 
	https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html for local farm market
	https://www.ncdc.noaa.gov/cdo-web/ for climate of past 1 month(the monthly result is not available after 2017/1/1 thus use data of 2016 instead)
	http://www.cuesa.org/eat-seasonally/charts/vegetables for the best season of different vegetables

	
Map view - two map:
	1> 1st map: used for choosing current location
	2> 2nd map: used for rendering the result
		The initialized Map is located at the user's current location as the transportation time is one of our factors.
		The farmer markets sell vegetables will be marked
		If the user click one of the marks on the map, then the details of that farmer's market will be shown
	
Data Visualization:
	Rating for each factor of choosing vegetables will be shown on APP as rating bar

Interation Form:
	Location form -- user enter his location for calculating transportation time
	User Selection form -- user chooses which vegetables he want to buy and add them into a cart
	Result form -- should includes
							1> the freshness of each vegetable in your cart considering the climate for each vendor's location of each market
							2> open hour and transportation time
							3> if it's a good season for a certain food, like strawberry in winter or apple in spring
Content:
	README.txt --This file.
	index.html --Web page for the App
	style.css --CSS style file with template from Bootstrap
	js --A directory contains all the javescript files
	image --A directory contains all images used in the website
	csv -- Some preprocessed data used by APP other than the online data
	
Test:
	The complete version of this App is expected to be tested on Chrome and Edge browser

	