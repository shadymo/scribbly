const socket = io('http://localhost:3000');
const body = document.getElementsByTagName('body')[0];

const nameSubmit = document.getElementById('nameSubmit');
const userHolder = document.getElementById('userHolder');
var isDown = false;
socket.on('welcome', (users) =>{
    handleUsers(users)
})

socket.on('userConnected', (users) =>{
    handleUsers(users);
})

body.addEventListener('unload', () =>{
    socket.emit('disconnect')
})
body.addEventListener('mousedown', (e) => {
    isDown = true;
    console.log(isDown);
})

body.addEventListener('mousemove', (e) =>{
    if(isDown){
        console.log(e.clientX)
    }
})

body.addEventListener('mouseup', () =>{
    isDown = false;
    console.log(isDown)
})

nameSubmit.addEventListener('click', (e) =>{
    const nameInput = document.getElementById('nameInput');
    const nameWindow = document.getElementById('main');
    e.preventDefault();
    const name = nameInput.value;
    console.log(name)
    if (name){
        socket.emit('nameInput', name)
        nameWindow.remove()
    }
})



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
            userHolder.appendChild(p);
        }
    }
}
state.execute('log')