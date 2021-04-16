function setupMapData(d) {
    var map_data = [{
      type:'scattermapbox',
      mode:'markers',
      marker: {
        size:14, 
        color:'rgb(255,102,102)'
      },
      lat:[],
      lon:[],
      text:[]
    }];
    
    for (var i = 0; i < d.length; i++) {
        map_data[0].lat[i] = d[i][0];
        map_data[0].lon[i] = d[i][1];
        map_data[0].text[i] = d[i][2];        
    }    

    
    return map_data;
}

function findCenter(d) {
    // find min and max of latitude & longitude
    var minLat = d[0][0]
    var maxLat = d[0][0]
    var minLong = d[0][1]
    var maxLong = d[0][1]
    
    for (var i = 0; i < d.length; i++) {
        if (d[i][0] < minLat) { minLat = d[i][0] }
        if (d[i][1] < minLong) { minLong = d[i][1] }
        if (d[i][0] > maxLat) { maxLat = d[i][0] }
        if (d[i][1] > maxLong) { maxLong = d[i][1] }      
       }
    
    var centerLat = (minLat+maxLat)/2
    var centerLong = (minLong+maxLong)/2
    
    return [centerLat, centerLong]
}

function setupMapLayout(d) {
    var center = findCenter(d);
    var map_layout = {
//        autosize: true,
//        hovermode: 'closest',
      mapbox: {
//        style: "satellite-streets",
        zoom: 5,
//        pitch: 0,
//        bearing: 0,
        center: {
          lat:center[0],
          lon:center[1]
        }
      }
    };
    
    return map_layout;
}

function getMapParams(jss) {
    var id = JSON.parse(jss);
    var mp = {
        data: [], 
        layout: {}
        };
        
    mp.data = setupMapData(id);
    mp.layout = setupMapLayout(id);
    
    return mp; 
}

function loadMap() {
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1Ijoiam9obnZrIiwiYSI6ImNqbmZwYnhnNzBmZDYzd3BzcDUydXB5NDYifQ.oXm95lM9mwEwXEh1lSHBrg'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/suny_map");
    xhttp.send();
}
