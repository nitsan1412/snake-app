
// get input elements
// // Get the modal
// var modal = document.getElementById("scoreBorad");

// // Get the button that opens the modal
// // var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("closeScors")[0];

// // When the user clicks on the button, open the modal
// // btn.onclick = function() {
// //   modal.style.display = "block";
// // }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// var table = document.getElementsByTagName("table")[0];
// var row = document.createElement("tr");

// function buildTable(dataArray) {
//   // console.log("enter build table");
//   table.appendChild(row);
//   var keysArr = Object.keys(dataArray[0]);
//   // var valuesArray = Object.values(dataArray);
//   keysArr.forEach(function (key, i) {
//     var h = document.createElement("th");
//     h.innerText = key;
//     console.log(key);
//     row.appendChild(h);
//     printdata(dataArray);
//     // console.log("the key is: ", key, "the value is: ", valuesArray[i]);
//   });
// }

// function printdata(dataArray) {
//   setTimeout(function () {
//     for (var i = 0; i < dataArray.length; i++) {
//       var f = document.createElement("td");
//       var l = document.createElement("td");
//       f.innerText = dataArray[i].name;
//       l.innerText = dataArray[i].email;
//       var trEl = document.createElement("tr");
//       trEl.appendChild(f);
//       trEl.appendChild(l);
//       table.appendChild(trEl);
//     }
//   }, 3000);
// }
