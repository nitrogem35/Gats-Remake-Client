//Client JS by nitrogem35 & pe3ak

var socket;
var players;
var serverList;
var selectedServer;

getServers();

function play() {
  sendOptions();
  addListeners();
};

function getServers() {
  fetch('https://Gats-Remake-API.gats-remake.repl.co/servers')
  .then(response => response.json())
  .then(data => {
    if(!data.error) serverList = data;
    connect(serverList.serverData[0].url);
  });
};

function connect(url, shouldjoin) {
  socket = new WebSocket(`wss://${url}`);
  socket.onopen = function() {
    socket.send(toBinary('.'))
    setInterval(() => {
      if(socket.readyState == 1) socket.send(toBinary('.'))
    }, 100)
  };
};

function sendOptions() {
  let gun = parseInt(document.getElementById("select").value.split("gun")[1]);
  let armor = 0;
  console.log(color,armor,gun)
  if(isNaN(armor)) armor = 0;
  if(isNaN(gun)) gun = 0;
  if(isNaN(color)) color = 0;
  
  socket.send(toBinary(`s,${gun},${armor},${color}`));
};

function addListeners() {
  document.onkeydown = (e) => {
    let c = e.keyCode;
    
  }
}

function decodeMessage(data) {
  data = new TextDecoder().decode(data);
  return data;
};

function toBinary(data) {
    var msgAsBuffer = new ArrayBuffer(data.length);
    var uint8Array = new Uint8Array(msgAsBuffer);
    for (var l = 0; l < data.length; l++) {
      uint8Array[l] = data.charCodeAt(l);
    };
    return new Uint8Array(uint8Array);
};

function changeColor(a) {
  color = a.split("color")[1]
}