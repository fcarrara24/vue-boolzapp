//this is a list of possible response 

export { possibleResponses, getRnd }

const possibleResponses = [
    { rndMsg: 'random1' },
    { rndMsg: 'random2' },
    { rndMsg: 'random3' },
    { rndMsg: 'random4' },
    { rndMsg: 'random5' },
    { rndMsg: 'random6' },

]

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}