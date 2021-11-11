var userName = document.getElementById("textbox");
// var valueUserName = userName.input;
// var form = document.getElementsByTagName("form");
var submit = document.getElementById("submit");

var winnersArr = [];
var tempWinner = {};
submit.addEventListener("click", function (event) {
  event.preventDefault();
  tempWinner.name = userName.value;
  localStorage.setItem("userName", tempWinner.name);
  console.log(tempWinner.name);
  console.log(typeof tempWinner.name);
  window.location.href = "/game.html";
});
