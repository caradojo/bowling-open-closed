var _ = require('lodash')


function isStrike(remainingRolls) {
    return remainingRolls[0] == 10
}
function scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls) {
    return {currentFrameScore: currentFrameScore, nextRemainingRolls: nextRemainingRolls}
}
function applyStrike(remainingRolls) {
    var currentFrameScore = 10 + remainingRolls[1] + remainingRolls[2]
    var nextRemainingRolls = _.drop(remainingRolls, 1);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}
function strikeFrame() {
    return {
        matches: isStrike,
        calculateScore: applyStrike
    }
}

function spareFrame() {
    return {
        matches: isSpare,
        calculateScore: calculateSpare
    }
}

function isSpare(remainingRolls) {
    return remainingRolls[0] + remainingRolls[1] == 10
}

function calculateSpare(remainingRolls) {
    var currentFrameScore = 10 + remainingRolls[2]
    var nextRemainingRolls = _.drop(remainingRolls, 2);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}

function normalFrame() {
    return {
        matches: function () {
            return true
        },
        calculateScore: calculateNormalScore
    }
}

function calculateNormalScore(remainingRolls) {
    var currentFrameScore = remainingRolls[0] + remainingRolls[1];
    var nextRemainingRolls = _.drop(remainingRolls, 2);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}

module.exports = {
    strikeFrame: strikeFrame,
    spareFrame: spareFrame,
    normalFrame: normalFrame,
}