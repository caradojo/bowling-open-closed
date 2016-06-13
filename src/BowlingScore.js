var _ = require('lodash')
var FrameTypes = require('./FrameTypes')

function BowlingScore(frameTypes) {

    function framesFor(remainingRolls) {
        if (remainingRolls.length === 0) return []

        var frameType = FrameTypes.findFrameType(frameTypes, remainingRolls)

        var scoreAndNextRolls = frameType.calculateScore(remainingRolls)

        var nextFrameScores = framesFor(scoreAndNextRolls.nextRolls)
        return [scoreAndNextRolls.frameScore].concat(nextFrameScores)
    }

    function totalScore(allRolls) {
        var framesScores = framesFor(allRolls)
        return framesScores.reduce(sum)
    }

    return {
        framesFor: framesFor,
        totalScore: totalScore
    }
}

function sum(a, b) {
    return a + b
}


module.exports = BowlingScore
