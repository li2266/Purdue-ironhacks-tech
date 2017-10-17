**Disclaimer: all the items explained below are not implemented.**

# Introduction

This is a web app that tries to help its user find fresh and cheap vegetables in his/her vicinity. The aim is to use some local and climate data to guide the user through a proper decision making process.
The following sections will provide more details on the developed model.

# Data sets

According to the problem definition, at least two sets of data should be employed. The following list introduces the datasets that are used in this app:
1. Historical climate data from [National Climate Data Center (NCDC)](https://www.ncdc.noaa.gov/cdo-web/webservices/v2#datasets).
⋅⋅⋅ This source provides comprehensive data on regional climate conditions and incidents. Since the problem is only aimed to the region of Lafayette, IN, we will be using the parts of data about average temperatures and any noticible precipitation in the 5 years history of the region.  

2. National Farmers Marketting Directory from [Agricultural marketting Service](https://www.ams.usda.gov/local-food-directories/farmersmarkets).
⋅⋅⋅ The chances of finding fresh and cheap vegetables in farmers local markets are higher than those of the available grocery stores. This is the reason, this apps just concentrates on the usefull data from those local markets. The data set that is used provides some geolocational information about those markets and the type of agricultral products they sell.

# The model

Apparently, all the local markets of a small region suffer or benefit a same climate condition during a year. Hence, it is not reasonable to look for a relationship between a a climate conditiona and a particualr market.
As mentioned earlier, the local market data provides some information about the location and sale items of the markets and we have used this information to approximately calculate commuting expenses and filter the items that the user is interested in.

# User interface

So far, the main concentration in the design of this app has been to provide a user-friendly environment to guide the user. The app is completely responsive and can be properly renderd in various screen sizes. On the other hand a simplistic design approach has been employed to prevent any complecation on user's side.
In summary the user interface of the application is composed of 3 major parts:
1. The main map, that shows the vecinity of the position the user is located. If the user's browser does not block location access, the map will be centered to the user's current location, otherwise the location of Purdue Memorial Union will be used to adjust viewport of the map.
User's current location and the positions of the local markets are specified using proper custom map markers. In adition to be being a graphical location indicators, these markers provide many other usefull inforamtion to user. For instance, clicking on the user's location marker,
will show the current weather condition in that position; and clicking on the corresponding markers of the markets, pops out a window contaning its google rating, contact information and a photo of the site. It should be noted that all these informations are extracted from online 
sources. For instance, the current weather condition is provided using Yahoo's weather forcast server and all those detailed information about the markets are provided by Google, through its comprehensive map API.

2. The setting menu, provides many configurations for the user interface and applications searching engine. For instance, it limits the distance within which the user's interested markets are located, or some settings for adjusting the user's location.

3. The information centers provide comprehensive search results to the user. The summary center is actived as the user chooses a particular market on the map, and the detail information is activated through that summary center. The information provided by these regions include trending charts of various products of the market, some predictions about the markets future products, etc.

