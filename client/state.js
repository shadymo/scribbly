const stateReader = document.getElementById('state')

const state = {
    current : 'namePrompt',
    states : {
        namePrompt :{
            log : () =>{
                state.current = 'drawing'
                stateReader.innerText = state.current;
            },
            guess: () =>{
                state.current = 'guessing';
                stateReader.innerText = state.current;
            }
        },
        drawing : {
            drawAttempt: (pos) =>{
                draw(pos);
            }
        },
        guessing: {
            recieveDraw: (pos) =>{
                draw(pos)
            }
        }
        
    },
    execute: (action, arg) =>{
        if (arg){
            state.states[state.current][action](arg);
        }else{
            state.states[state.current][action]();
        }
    }
    
}

//functions
//=================================
function draw(pos){
    if(isDown || state.current === 'guessing'){
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(pos.x,pos.y);
        ctx.stroke();
        [lastX, lastY] = [pos.x, pos.y];
        if(state.current === 'drawing'){
            socket.emit('drawing', {x : pos.x, y: pos.y})
        }
    }
}