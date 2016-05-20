var _ = require('lodash')

function strikeFrame() {
    function isStrike(remainingRolls) {
        return remainingRolls[0] == 10
    }
    function applyStrike(remainingRolls) {
        var currentFrameScore = 10 + remainingRolls[1] + remainingRolls[2]
        var nextRemainingRolls = _.drop(remainingRolls, 1);
        return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
    }
    return {
        matches: isStrike,
        calculateScore: applyStrike
    }
}

function spareFrame() {
    function isSpare(remainingRolls) {
        return remainingRolls[0] + remainingRolls[1] == 10
    }
    function calculateSpare(remainingRolls) {
        var currentFrameScore = 10 + remainingRolls[2]
        var nextRemainingRolls = _.drop(remainingRolls, 2);
        return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
    }
    return {
        matches: isSpare,
        calculateScore: calculateSpare
    }
}



function normalFrame() {
    function calculateNormalScore(remainingRolls) {
        var currentFrameScore = remainingRolls[0] + remainingRolls[1];
        var nextRemainingRolls = _.drop(remainingRolls, 2);
        return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
    }
    return {
        matches: function () {
            return true
        },
        calculateScore: calculateNormalScore
    }
}

function scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls) {
    return {currentFrameScore: currentFrameScore, nextRemainingRolls: nextRemainingRolls}
}


function findFrameType(allFrameType, remainingRolls) {
    var frameType = _.find(allFrameType, function (frameType) {
        return frameType.matches(remainingRolls)
    })
    return frameType
}

module.exports = {
    strikeFrame: strikeFrame,
    spareFrame: spareFrame,
    normalFrame: normalFrame,
    findFrameType: findFrameType
}