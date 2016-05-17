var _ = require('lodash')

function BowlingScore(framesSoFar) {
    this.framesSoFar = framesSoFar
}


function parseToInteger(n) {
    return Number.parseInt(n)
}
function calculateFrame(framesSoFar) {
    return function calculateCurrentFrame(currentFrame) {
        var rolls = currentFrame.split('').map(parseToInteger)
        return rolls[0] + rolls[1]
    }

}

function sum(a, b) {
    return a + b
}

BowlingScore.prototype = {

    roll: function (frame) {
        return new BowlingScore(this.framesSoFar.concat(frame))
    },

    score: function () {
        var framesSoFar = this.framesSoFar
        return framesSoFar.map(calculateFrame(framesSoFar)).reduce(sum)
    }
}

module.exports = BowlingScore
