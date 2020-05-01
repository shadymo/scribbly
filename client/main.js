// Pictionary/ scribbly.io type of game


//connect to socket io server
const socket = io('http://shadyserver.herokuapp.com:3000');

//initializeDOM Constants
//===================================================
const body = document.getElementsByTagName('body')[0];
const nameSubmit = document.getElementById('nameSubmit');
const userHolder = document.getElementById('userHolder');
const canvas = document.getElementById('canvas');
const drawArea = document.getElementById('drawArea');
const changeState = document.getElementById('changeState');
const readyCheck =document.getElementById('readyCheck');
//initialize canvas renderer
const ctx = canvas.getContext("2d");
//set canvas size
canvas.width = 600;
canvas.height = 600;
//initialize starting points, and is down boolean for Draw function
var lastX = 0;
var lastY = 0;
var isDown = false;
//=======================================================================


//Dom Manipulation
//=================================================================
body.addEventListener('unload', () =>{
    socket.emit('disconnect')
})
canvas.addEventListener('mousedown', (e) => {
    isDown = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    socket.emit('newStart', {x: e.offsetX, y: e.offsetY});
})

canvas.addEventListener('mousemove', (e) =>{
    var obj = {x: e.offsetX, y: e.offsetY};
    try {
        state.execute('drawAttempt', obj)
    } catch (error) {
        console.log('not Drawer')
    }
});

canvas.addEventListener('mouseleave', () =>{
    isDown = false;
})

canvas.addEventListener('mouseup', () =>{
    isDown = false;
})
changeState.addEventListener('click', () =>{
    state.execute('log')
})
nameSubmit.addEventListener('click', (e) =>{
    const nameInput = document.getElementById('nameInput');
    const nameWindow = document.getElementById('signIn');
    e.preventDefault();
    const name = nameInput.value;
    console.log(name)
    if (name){
        socket.emit('nameInput', name)
        nameWindow.remove()
        readyCheck.style.display = 'flex';
        state.execute('guess')
    }
})
//=============================================================


//handle socket Connections
//============================================================
socket.on('welcome', (users) =>{
    handleUsers(users)
})

socket.on('userConnected', (users) =>{
    handleUsers(users);
})
socket.on('elseDraw', (pos)=>{
    
    try {
        state.execute('recieveDraw', pos)
    } catch (error) {
        console.log(error)
    }
})
socket.on('updateStart', (pos)=>{
    if(state.current ==='guessing'){
        lastX = pos.x;
        lastY = pos.y;
    }
})
//=============================================================

//function declarations
//===========================================================


function handleUsers(users){
    if(users){
        var arr = [];
        for(var user of Object.keys(users)){
            arr.push(users[user])
        }
        var list = userHolder.childNodes;
        while(list[0]){
            list[0].remove();
        }
        for(var i = 0; i < arr.length; i++){
            var p = document.createElement('p');
            p.innerText = arr[i];
            p.className = 'username'
            userHolder.appendChild(p);
        }
    }
}


