// let email = document.getElementById("uname").value;
// console.log()
let pos = email.indexOf("@");

let user = email.slice(0, pos);
document.getElementById("wel").innerText = user;
