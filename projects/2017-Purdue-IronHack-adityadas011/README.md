# Ironhacks

1.  Name of Application: Veggie Locator

2.  Keywords: distance, freshness, price, season

3.  Datasets: The application uses APIs of the datasets. 

  * Climdate Data Online (https://www.ncdc.noaa.gov/cdo-web/webservices/v2)
    This dataset provides data on the climate at the desired location. This is the primary dataset and is from data.gov. The       columns used will be snowfall, precipitation, 
  
  * USDA National Farmers Market Directory (https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html)
    This dataset provides data on the farmer markets. The location (latitude and longitude), the distance of the market, and       the store times will be some of the columns used. This data set is from data.gov.
    
4. Veggie Locator is a mashup application that provides the user with nearby farmer markets. The user will be provided with      information on the freshness of the vegetables and the prices of the vegetables at the markets. This information will be      presented in a bar chart that can be easily read. The application map is centered at the Lafayette/West Lafayette area in      Indiana.

  * Map View:
  
    1. [Y] Basic Map with specific location (West Lafayette/Lafayette)
    2. [Y] Markers for location of markets
    3. [Y] Labels for markets' names
    4. [Y] InfoWindow to show detail information of a market
    5. [N]
  
  * Data Visualization:
  
    1. [Y] Bar chart
    2. [N]
  
  * Interaction Form:

    1. [Y] Output will be displayed in a text area.
    2. [N] 
    3. [N]
    4. [Y] Filter on price and distance.
    5. [N]

5. Download and install node.js.

6. The project was tested on Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.

7. The application is still being developed. I am facing the challenge of connecting the APIs to the application. 
