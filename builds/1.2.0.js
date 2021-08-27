/*
  Protocol specification:
  https://sharedrory.gitbook.io/gunnarz-protocol/
*/

const options = {
    'gun': '0',
    'color': '0',
    'armor': '0'
}

var serverList;
var pingSocket;
var socket;

initializeGame()


class game {
    constructor() {
        this.player = {
            'spawned': false,
            'x': null,
            'y': null,
            'spdX': null,
            'spdY': null,
            'gun': null,
            'color': null,
            'armor': null,
            'mouseAngle': null,
            'score': null,
            'kills': null,
            'perks': {
                '1': null,
                '2': null,
                '3': null
            },
            'takingDamage': null
        }
        this.inView = {
            'obstacles': [],
            'bullets': [],
            'players': []
        }

    }

    spawn() {
        if (this.player.spawned) return;

    }
}

function initializeGame() {
    var playButton = document.getElementById('button-play')
    var ca = '.'
    var connectingAnimationLoop = setInterval(() => {
        if (ca.length > 3) ca = '.'
        playButton.innerHTML = `Connecting${ca}`
        ca += '.'
    }, 500)
    changeColor(options.color)
    changeArmor(options.armor)
    getServers().then(servers => {
        serverList = []
        if (!servers.error) for (var i in servers) {
            serverList.push(servers[i])
        }
        else {
            clearInterval(connectingAnimationLoop)
            playButton.innerHTML = servers.error
            playButton.style.backgroundPosition = '100%'
            playButton.style.cursor = ''
        }
        //check ping
    })
        .catch(error => {
            clearInterval(connectingAnimationLoop)
            playButton.innerHTML = 'Error fetching servers.'
            playButton.style.backgroundPosition = '100%'
            playButton.style.cursor = ''
        })
};

function getServers() {
    return fetch('https://Gats-Remake-API.gats-remake.repl.co/servers')
        .then(json => json.json())
};

function decodePacket(data) {

};

function changeColor(a) {
    a = a.slice(-1)
    var oldColorStyle = document.getElementById(`color${options.color}`).style
    oldColorStyle.boxSizing = ""
    oldColorStyle.border = ""
    options.color = a
    var newColorStyle = document.getElementById(`color${options.color}`).style
    newColorStyle.boxSizing = "border-box"
    newColorStyle.border = "5px solid black"
};

function changeArmor(a) {
    a = a.slice(-1)
    var oldArmorStyle = document.getElementById(`armor${options.armor}`).style
    oldArmorStyle.boxSizing = ""
    oldArmorStyle.border = ""
    oldArmorStyle.borderRadius = ""
    options.armor = a
    var newArmorStyle = document.getElementById(`armor${options.armor}`).style
    newArmorStyle.boxSizing = "border-box"
    newArmorStyle.border = "5px solid black"
    newArmorStyle.borderRadius = "4px"
};

function closeLogin() {
    document.getElementById(`login-menu-container`).style.display=`none`
    document.getElementById(`main`).style.display=``
    document.getElementById(`title`).style.display=``
};

function openLogin() {
    document.getElementById(`login-menu-container`).style.display=``
    document.getElementById(`main`).style.display=`none`
    document.getElementById(`title`).style.display=`none`
};

function openGuns() {
    document.getElementById(`main`).style.display=`none`
    document.getElementById(`title`).style.display=`none`
    document.getElementById(`guns-menu`).style.display=``
};

function onHoverSfx() {
    var sfx = document.getElementById('onHoverSfx')
    sfx.play()
};

function onClickSfx() {
    var sfx = document.getElementById('onClickSfx')
    sfx.play()
};

function onLoad(ms) {
    clearInterval(load)
    loadingText.innerHTML = `Loaded (${ms}ms)`
    setTimeout(() => {
        loadingText.style.animation = 'flash 2s'
        setTimeout(() => {
            loadingText.style.display = 'none'
            document.getElementById('title-div').style.display = ''
            document.getElementById('main').style.display = ''
        }, 1950)
    }, 300)
};