var modalBtn=document.querySelector('#ModalBtn');
var modalBg=document.querySelector('#modalBj-1');
var modalD=document.querySelector('#modal-1');
var successBtnd=document.querySelector('#success-1');
var submitBtn=document.querySelector('#submit');
var submitRoute=document.getElementById('SubmitRoute');//Add Submit Route button
var cancel=document.querySelector('#cancel');
var cancel2=document.querySelector('#cancel2');
var cancel3=document.querySelector('#cancel3');
var modalT=document.querySelector('#modal-2');
var modalR=document.querySelector('#modal-3');//Add Route modal
var nombreM=document.getElementById('nombre');
var apellidoM=document.getElementById('apellido');
var telefonoM=document.getElementById('tel');
var licenciaM=document.getElementById('licencia');
var tipoLicM=document.getElementById('tipoL');
var placaM=document.getElementById('placa');
var statusM=document.getElementById('status');
var tonelajeM=document.getElementById('tonelaje');
var origenM=document.getElementById('origen');
var destinoM=document.getElementById('destino');
var tipoM=document.getElementById('tipoC')
var tripInfoC=document.getElementById('tripInfo');
var trip={tripId:'',nombre:'',apellido:'', telefono:'',numeroLicencia:'',tipoLicencia:'',placa:'',status:'',tipo:'',tonelaje:'',origen:'',destino:'',};

displayTrips();

modalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalD.classList.add('is-active');
});

successBtnd.addEventListener('click', function(e) { 
    e.preventDefault();
    if(saveDriver()==true){
        modalD.classList.remove('is-active');
        modalT.classList.add('is-active');
    }
    
});
cancel.addEventListener('click', function(e) { 
    e.preventDefault();
    modalD.classList.remove('is-active');
});
cancel2.addEventListener('click', function(e) { 
    e.preventDefault();
    modalT.classList.remove('is-active');
});
cancel3.addEventListener('click', function(e) { 
    e.preventDefault();
    modalR.classList.remove('is-active');
});
submit.addEventListener('click', function(e) { 
    e.preventDefault();
    if(saveTruck()==true){
        modalT.classList.remove('is-active');
        modalR.classList.add('is-active');//Activate Route modal
    }
});

//----
submitRoute.addEventListener('click', function(e) { 
    e.preventDefault();
    if(saveRoute()==true){
        modalR.classList.remove('is-active');//Dectivate Route modal
        save();
    }
});
//----

function saveDriver(){

    if(nombreM.value==""){
        document.getElementById('messagename').textContent="Este campo es obligatorio";
    } if(apellidoM.value==""){
        document.getElementById('messageAp').textContent="Este campo es obligatorio";
    } if(telefonoM.value==""){
        document.getElementById('telefono').textContent="Este campo es obligatorio";
    } if(licenciaM.value==""){
        document.getElementById('nolic').textContent="Este campo es obligatorio";
    }if(tipoLicM.value==""){
        document.getElementById('tipolic').textContent="Este campo es obligatorio";
        return false;
    }

    trip.nombre=nombreM.value;
    trip.apellido=apellidoM.value;
    trip.telefono=telefonoM.value;
    trip.numeroLicencia=licenciaM.value;
    trip.tipoLicencia=tipoLicM.value;
    return true;
}

function saveTruck(){
    if(placaM.value==""){
        document.getElementById('placaP').textContent="Este campo es obligatorio";
    }if(statusM.value==""){
        document.getElementById('statusP').textContent="Este campo es obligatorio";
    }if(tonelajeM.value==""){
        document.getElementById('tonelajeP').textContent="Este campo es obligatorio";
        return false;
    }
    
    trip.placa=placaM.value;
    trip.status=statusM.value;
    trip.tipo=tipoM.value;
    trip.tonelaje=tonelajeM.value;
    
    return true;
};

//
function saveRoute(){

    if(document.getElementById('from').value == ""){
        console.log('from vacio');
        return false;
    }if(document.getElementById('to').value == ""){
        console.log('to vacio');
        return false;
    }

    trip.origen = document.getElementById('from').value;
    trip.destino = document.getElementById('to').value;

    return true;
}
//

function save(){

    var trips=[];
    var index=1; 
    nombreM.value="";
    apellidoM.value="";
    telefonoM.value="";
    licenciaM.value="";
    tipoLicM.value="";
    placaM.value="";
    statusM.value="";
    tonelajeM.value="";
    tipoM.value="";
    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    document.getElementById('output').innerHTML='';
    directionsDisplay.setDirections({ routes: []}); 
    map.setCenter(latlng);


    if ( localStorage.getItem('lsa_Trips') != undefined ){
        trips = JSON.parse(localStorage.getItem('lsa_Trips'));
        index=trips.length+1;
    }
    trip.tripId="TRIP-"+index;
    trips.push(trip);
    localStorage.setItem('lsa_Trips',JSON.stringify(trips));

    displayTrips();
    tripInfo(trip.tripId);

    trip.nombre='';
    trip.apellido='';
    trip.telefono='';
    trip.numeroLicencia='';
    trip.tipoLicencia='';
    trip.placa='';
    trip.status='';
    trip.tipo='';
    trip.tonelaje='';
    trip.origen='';
    trip.destino='';
};

function displayTrips(){
    var trips=[];
    var htmlText="";

    if ( localStorage.getItem('lsa_Trips') != undefined ){
        trips = JSON.parse(localStorage.getItem('lsa_Trips'));
        trips = trips.reverse();
        for(var i=0;i<trips.length;i++){

            htmlText+="<button class='button is-black-bin  is-fullwidth my-3' onClick=tripInfo('"+trips[i].tripId+"')>"+trips[i].tripId+"</button>";
        }
        var saveTriphtml=document.getElementById('btnLi');
        saveTriphtml.innerHTML=htmlText;
        
    }
};
function tripInfo(tripId){
    tripInfoC.innerHTML='';
    if ( localStorage.getItem('lsa_Trips') != undefined ){
        var trips = JSON.parse(localStorage.getItem('lsa_Trips'));
        var searchIndex=trips.findIndex((EventObj)=>EventObj.tripId==tripId);
        if(searchIndex>=0){
            var workOrder=trips.splice(searchIndex,1);
            console.log(workOrder);
            //Despliegue de informacion de conductor
            var cardInfo=document.createElement('div');
                cardInfo.setAttribute('class','card');
            var cardHeader=document.createElement('div');
                cardHeader.setAttribute('class','card-header');
            var cardContent=document.createElement('div');
                cardContent.setAttribute('class','card-content');
            var titleD=document.createElement('p');
                titleD.setAttribute('class','has-text-weight-bold mx-5 my-2');
                titleD.textContent=workOrder[0].tripId;
            var h4Conductor=document.createElement('h4');
                h4Conductor.textContent='Conductor:';
                h4Conductor.setAttribute('class','has-text-weight-bold');
            var nombreD=document.createElement('p');
                nombreD.textContent='Nombre: '+workOrder[0].nombre;
            var apellidoD=document.createElement('p');
                apellidoD.textContent='Apellido: '+workOrder[0].apellido; 
            var telefonoD=document.createElement('p');
                telefonoD.textContent='Telefono: '+workOrder[0].telefono;
            var numeroLD=document.createElement('p');
                numeroLD.textContent='Numero de licencia: '+workOrder[0].numeroLicencia;
            var tpD=document.createElement('p');
                tpD.textContent='Tipo de licencia: '+workOrder[0].tipoLicencia; 
            var br=document.createElement('br');
                
            cardHeader.appendChild(titleD);
            cardInfo.appendChild(cardHeader);
            cardInfo.appendChild(cardContent);
            tripInfoC.appendChild(cardInfo);
            cardContent.appendChild(h4Conductor);
            cardContent.appendChild(nombreD);
            cardContent.appendChild(apellidoD);
            cardContent.appendChild(telefonoD);
            cardContent.appendChild(numeroLD);
            cardContent.appendChild(tpD);
            tripInfoC.appendChild(br);

            //Despliegue de informacion camion
            var cardInfoT=document.createElement('div');
                cardInfoT.setAttribute('class','card');
            var cardContentT=document.createElement('div');
                cardContentT.setAttribute('class','card-content');
            var h4Camion=document.createElement('h4');
                h4Camion.textContent='Camion:';
                h4Camion.setAttribute('class','has-text-weight-bold');
            var placaT=document.createElement('P');
                placaT.textContent='Placa: '+workOrder[0].placa;
            var statusT=document.createElement('p');
                statusT.textContent='Status: '+workOrder[0].status; 
            var tipoT=document.createElement('p');
                tipoT.textContent='Tipo: '+workOrder[0].tipo; 
            var tonelajeT=document.createElement('p');
                tonelajeT.textContent='Tonelaje: '+workOrder[0].tonelaje;
            var brT=document.createElement('br');

            tripInfoC.appendChild(cardInfoT);
            cardInfoT.appendChild(cardContentT);
            cardContentT.appendChild(h4Camion);
            cardContentT.appendChild(placaT);
            cardContentT.appendChild(statusT);
            cardContentT.appendChild(tipoT);
            cardContentT.appendChild(tonelajeT);
            tripInfoC.appendChild(brT);

            //Display Route info
            var cardInfoR = document.createElement('div');
                cardInfoR.setAttribute('class','card');
            var cardContentR = document.createElement('div');
                cardContentR.setAttribute('class', 'card-content');
            var h4Route = document.createElement('h4');
                h4Route.setAttribute('class', 'has-text-weight-bold');
                h4Route.textContent = 'Ruta:';
            var originR = document.createElement('P');
                originR.textContent = 'Origen: '+workOrder[0].origen;
            var destinationR = document.createElement('P');
                destinationR.textContent = 'Destino: '+workOrder[0].destino;
            
            var mapR = document.createElement('div');
                mapR.setAttribute('class', 'box boxMaps');
                mapR.setAttribute('id', 'googleMap2');

            var originWR = document.createElement('P');
            var destinationWR = document.createElement('P');

            var routeInfoR = document.createElement('P');

            tripInfoC.appendChild(cardInfoR);
            cardInfoR.appendChild(cardContentR);
            cardContentR.appendChild(h4Route);
            cardContentR.appendChild(originR);
            cardContentR.appendChild(originWR);
            cardContentR.appendChild(destinationR);
            cardContentR.appendChild(destinationWR);
            cardContentR.appendChild(routeInfoR);
            cardContentR.appendChild(mapR);

            var map2 = new google.maps.Map(document.getElementById("googleMap2"), mapOptions);

            calculateRouteV2(workOrder[0].origen, workOrder[0].destino, map2, routeInfoR);

            calculateWeatherOriginDestination(workOrder[0].origen, originWR);
            calculateWeatherOriginDestination(workOrder[0].destino, destinationWR);


        }
    }

}