/* =========================================

CONFIGURAÇÃO DA API

========================================= */

const API =

"https://script.google.com/a/macros/id.uff.br/s/AKfycbzvr2wAgsNggctZtiAgSoUNznAFVMvwgJoRDV9x_Wda0a3Ub0WF8zMw-uLPmZUFU1Y8/exec";



let diasPermitidos = [];


/* =========================================

INICIAR CALENDÁRIO

========================================= */

flatpickr("#data", {

dateFormat: "Y-m-d",

minDate: new Date().fp_incr(2),

maxDate: new Date().fp_incr(60),

onChange: function(selectedDates, dateStr){

buscarHorarios(dateStr);

}

});


/* =========================================

CARREGAR DIAS PERMITIDOS

========================================= */

function carregarDias(){


fetch(API + "?action=getDias")

.then(r => r.json())

.then(dias => {

diasPermitidos = dias;

});


}



/* =========================================

CARREGAR HORÁRIOS

========================================= */

function buscarHorarios(data){


let select = document.getElementById("hora");


select.innerHTML = "<option>Carregando...</option>";



fetch(

API +

"?action=getHorarios&data="

+ data

)


.then(r => r.json())


.then(resultado => {


select.innerHTML = "";


if(!resultado.horarios ||

resultado.horarios.length === 0){

select.innerHTML =

"<option>Sem horários</option>";

return;

}



resultado.horarios.forEach(h => {


select.innerHTML +=

`<option value="${h}">${h}</option>`;


});


});


}



/* =========================================

ENVIAR AGENDAMENTO

========================================= */


document

.getElementById("formAgendamento")

.addEventListener(

"submit",

function(e){


e.preventDefault();


let dados = {


action: "agendar",


nome:

document.getElementById("nome").value,


email:

document.getElementById("email").value,


data:

document.getElementById("data").value,


hora:

document.getElementById("hora").value,


unidade:

document.getElementById("unidade").value


};



fetch(API,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify(dados)

})


.then(r => r.json())


.then(res => {


document

.getElementById("mensagem")

.innerHTML =

res.mensagem;


})


.catch(err => {


document

.getElementById("mensagem")

.innerHTML =

"Erro ao agendar";


});


});



/* =========================================

INICIAR SISTEMA

========================================= */

carregarDias();

