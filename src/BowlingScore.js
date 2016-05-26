var _ = require('lodash')
var FrameTypes = require('./FrameTypes')

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}

function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []

    var frameType = FrameTypes.findFrameType(remainingRolls)

    var scoreAndNextRolls = frameType.calculateScore(remainingRolls)

    var nextFrameScores = recursiveFrameScore(scoreAndNextRolls.nextRolls)
    return [scoreAndNextRolls.frameScore].concat(nextFrameScores)
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
