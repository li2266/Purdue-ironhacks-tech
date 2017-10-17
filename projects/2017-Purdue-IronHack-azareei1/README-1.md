Author: Amin Zareei, PURDUE GOLD IRONHACK
1. Name of Application: NUTESY

2. Keywords: Desire, Nutrition, Price

3. In this application two datasets are used.

  1. Primary dataset: Normals Daily
   *Description: he Global Historical Climatology Network - Daily (GHCN-Daily) dataset integrates daily climate observations from approximately 30 different data sources. Version 3 was released in September 2012 with the addition of data from two additional station networks. Changes to the processing system associated with the version 3 release also allowed for updates to occur 7 days a week rather than only on most weekdays. Version 3 contains station-based measurements from well over 90,000 land-based stations worldwide, about two thirds of which are for precipitation measurement only. Other meteorological elements include, but are not limited to, daily maximum and minimum temperature, temperature at the time of observation, snowfall and snow depth. Over 25,000 stations are regularly updated with observations from within roughly the last month. The dataset is also routinely reconstructed (usually every week) from its roughly 30 data sources to ensure that GHCN-Daily is generally in sync with its growing list of constituent sources. During this process, quality assurance checks are applied to the full dataset. Where possible, GHCN-Daily station data are also updated daily from a variety of data streams. Station values for each daily update also undergo a suite of quality checks.- The link of dataset is: 
   https://gis.ncdc.noaa.gov/geoportal/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00861
   
  2. Farmers Market
   *The link of dataset is:
   https://catalog.data.gov/dataset/food-environment-atlas-f4a22
    
4. Project Description:
   *In this two stage application first, the user should enter the date. After that, based on the dataset#1 for Lafayette area in 2010 a regression line has been fitted to the daily temperature for the entire year in Lfayette area and with a good correlation. (The excel file is attached). Using the date entered by the user the temperature would be calculated and based on the calculated temperate some suggestions would be made to buy or not buy cucumbers, onion and lettuce. These suggestions are based on the suitable temperature range for freshness of the vegetables.
   In the second stage the user is asked to use the Google map presented with the markers on it. The animated markers show the farmer markets in the Lfayette area and when the user click on the correspondent marker the nutritional information as well as the website of the farmer market would be displayed. The nutritional information includes participation of that farmer market in three nutritional program as Nutrition Program for Women, Infants, and Children (WIC), Senior Farmers Market Nutrition Program (SFMNP) and Supplemental Nutrition Assistance Program (SNAP). Also, the information of supermarkets in West-Lafayette area has been provided in case the user is in a hurry to buy vegetables.
   
5. Map View:
   * The map shows West Lafayette area. It includes two groups of markers. The animated ones are farmer markets obtained from farmer market data and the others are super markets.
   *Each marker has an infowindow. Animated markers also includes nutritinal informtion of the farmer market.
   *All the infowindows peovide a link to the website of the super or farmer market.

6. Data Visualization:
   *Using Excel software a regression line has been fitted to the graph of daily temperature vs. date for Lafayette area with acceptable correlation. The equation then has been used in JavaScript code for estimation of the temperature as the user entered the date.

7. Interaction Form: 
   *In the first stage of the app the user needs to enter the date and after that some temperature calculation would be performed and based on the computed temperature the suggestions would be made to buy or not buy cucumber, onion and lettuce.

8. The app has been tested on Chrome.    
 


