// Create a script tag and set the USGS URL as the source.
        var script = document.createElement('script');

        //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        script.src = 'Abandoned_Housing.geojson';
        document.getElementsByTagName('head')[0].appendChild(script);