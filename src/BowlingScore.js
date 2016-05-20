var _ = require('lodash')
var FrameTypes = require('./FrameTypes')
var strikeFrame = FrameTypes.strikeFrame
var spareFrame = FrameTypes.spareFrame
var normalFrame = FrameTypes.normalFrame

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}

function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []

    var allFrameType = [strikeFrame(), spareFrame(), normalFrame()]
    var frameType = FrameTypes.findFrameType(allFrameType, remainingRolls)

    var scoreAndRemainingRolls = frameType.calculateScore(remainingRolls)

    var nextFrameScores = recursiveFrameScore(scoreAndRemainingRolls.nextRemainingRolls)
    return [scoreAndRemainingRolls.currentFrameScore].concat(nextFrameScores)
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
