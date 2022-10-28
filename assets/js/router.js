//map options
var latlng = {
    lat: 19.4326,
    lng: -99.1332
};

var mapOptions = {
    center: latlng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

//map creation
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//Directions Service creation
var directionService = new google.maps.DirectionsService();

//Directions Render creation
var directionsDisplay = new google.maps.DirectionsRenderer();

//Binding: Directions Display & Map
directionsDisplay.setMap(map);

function calculateRoute(){

    //Request creation
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    //Request Send
    directionService.route(request, (result, status) => {

        if (status == google.maps.DirectionsStatus.OK){

            //Receive Distance & Time
            const output = document.querySelector('#output');
            //output.innerHTML = "<div class='alert-info'> From: " + document.getElementById('from').value + ".<br/>To: " + document.getElementById('to').value + "<br/> Distance <i class='fa-solid fa-road'></i>" + result.routes[0].legs[0].distance.text + ".<br/>Duration <i class='fa-solid fa-clock'></i>: " + result.routes[0].legs[0].duration.text + ". </div>";

            output.innerHTML = '<P>Origen: ' +  result.routes[0].legs[0].start_address + '</P>' + 
                               '<P id="originModalWeather" ></P>' + 
                               '<P>Destino: ' +  result.routes[0].legs[0].end_address + '</P>' + 
                               '<P id="destinationModalWeather" ></P>' + 
                               '<P>Distancia: ' + result.routes[0].legs[0].distance.text + '</P>' + 
                               '<P>Tiempo: ' + result.routes[0].legs[0].duration.text + '</P>';

            //Display route on map
            directionsDisplay.setDirections(result);   

            calculateWeatherOriginDestination(result.routes[0].legs[0].start_address, document.getElementById('originModalWeather'));
            calculateWeatherOriginDestination(result.routes[0].legs[0].end_address, document.getElementById('destinationModalWeather'));

        }else{

            //No available route
            directionsDisplay.setDirections({ routes: []}); //empty route
            map.setCenter(latlng);

            //error message
            output.innerHTML = "<div class='alert-danger'><i class='fa-solid fa-triangle-exclamation'></i> Could not find a route. </div>"

        }
     }
    );
}

function calculateWeatherOriginDestination(city, container){

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=8317f2907e7792815e65ac40b4c293be&units=metric')
        .then(function (response) {
    return response.json();
    })
    .then(function (data) {

        if ( data.cod == 200 ){

            container.innerHTML =   '<div class="card-content">' +
                                    '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">' +                    
                                    '<P>' +
                                    'Temp: ' + data.main.temp + ' \u2103'  + 
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Viento: ' + data.wind.speed + ' m/s' +  
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Humedad: ' + data.main.humidity + '%' +  
                                    '</P>' + 
                                    '</div>';

        }else{

            console.log(data.cod);
            console.log(data.message);
      
        }

    });

}

function calculateRouteV2(from, to, lpmap, container){

    var directionService2 = new google.maps.DirectionsService();
    var directionsDisplay2 = new google.maps.DirectionsRenderer();
    directionsDisplay2.setMap(lpmap);

    //Request creation
    var request = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    //Request Send
    directionService2.route(request, (result, status) => {

        //Display route on map
        directionsDisplay2.setDirections(result);   

        container.innerHTML = 'Distancia: ' + result.routes[0].legs[0].distance.text +
                              '<br /><br />' + 
                              'Tiempo: ' + result.routes[0].legs[0].duration.text;

    });

}

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);