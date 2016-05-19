var _ = require('lodash')

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}

function isStrike(remainingRolls) {
    return remainingRolls[0] == 10
}

function isSpare(remainingRolls) {
    return remainingRolls[0] + remainingRolls[1] == 10
}

function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []

    var currentFrameScore;
    var nextRemainingRolls;
    if (isStrike(remainingRolls)) {
        currentFrameScore = 10 + remainingRolls[1] + remainingRolls[2]
        nextRemainingRolls = _.drop(remainingRolls, 1);
    }
    else if (isSpare(remainingRolls)) {
        currentFrameScore = 10 + remainingRolls[2]
        nextRemainingRolls = _.drop(remainingRolls, 2);
    } else {
        currentFrameScore = remainingRolls[0] + remainingRolls[1];
        nextRemainingRolls = _.drop(remainingRolls, 2);
    }

    return [currentFrameScore].concat(recursiveFrameScore(nextRemainingRolls))
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
