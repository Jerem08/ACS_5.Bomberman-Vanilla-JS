// Get the modal
var modal = document.getElementById("myModal");

var p = document.getElementsByClassName('text')[0];

// When the user clicks the button, open the modal
function openModal() {
  modal.style.display = "block";
}

function changeTextModal(text){
  p.innerHTML = text;
}

function closeModal(){
  modal.style.display = "none";
}

function changeTexteButton(){
  document.getElementById('button').innerHTML = "Rejouer !";
}
