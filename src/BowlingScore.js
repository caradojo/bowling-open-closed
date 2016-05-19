var _ = require('lodash')

function BowlingScore() {
}


function sum(a, b) {
    return a + b
}

function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []
    var currentFrameScore = remainingRolls[0] + remainingRolls[1]
    var nextRemainingRolls = _.drop(remainingRolls, 2)
    return [currentFrameScore].concat(recursiveFrameScore(nextRemainingRolls))
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
