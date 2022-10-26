var modalBtn=document.querySelector('#ModalBtn');
var modalBg=document.querySelector('#modalBj-1');
var modalD=document.querySelector('#modal-1');
var successBtnd=document.querySelector('#success-1');
var submitBtn=document.querySelector('#submit');
var cancel=document.querySelector('#cancel');
var modalT=document.querySelector('#modal-2');
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
    modalT.classList.remove('is-active');
});
submit.addEventListener('click', function(e) { 
    e.preventDefault();
    if(saveTruck()==true){
        modalT.classList.remove('is-active');
    }
});
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
}