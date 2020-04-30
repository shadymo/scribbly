const state = {
    current : 'namePrompt',
    states : {
        namePrompt :{
            log : () =>{
                console.log(`the current state is ${state.current}`)
            }
        }
    },
    execute: (action) =>{
        state.states[state.current][action]();
    }
    
}