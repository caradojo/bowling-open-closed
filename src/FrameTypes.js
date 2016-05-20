var _ = require('lodash')

function strikeFrame() {
    function isStrike(rolls) {
        return rolls[0] == 10
    }
    function applyStrike(rolls) {
        var frameScore = 10 + rolls[1] + rolls[2]
        var nextRolls = _.drop(rolls, 1);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: isStrike,
        calculateScore: applyStrike
    }
}

function spareFrame() {
    function isSpare(rolls) {
        return rolls[0] + rolls[1] == 10
    }
    function calculateSpare(rolls) {
        var frameScore = 10 + rolls[2]
        var nextRolls = _.drop(rolls, 2);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: isSpare,
        calculateScore: calculateSpare
    }
}

function normalFrame() {
    function calculateNormalScore(rolls) {
        var frameScore = rolls[0] + rolls[1];
        var nextRolls = _.drop(rolls, 2);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: function () {
            return true
        },
        calculateScore: calculateNormalScore
    }
}

function scoreAndRemainingRolls(frameScore, nextRolls) {
    return {frameScore: frameScore, nextRolls: nextRolls}
}

function findFrameType(allFrameType, rolls) {
    function matchesCurrentFrame(frameType) {
        return frameType.matches(rolls)
    }
    return _.find(allFrameType, matchesCurrentFrame)
}

module.exports = {
    strikeFrame: strikeFrame,
    spareFrame: spareFrame,
    normalFrame: normalFrame,
    findFrameType: findFrameType
}