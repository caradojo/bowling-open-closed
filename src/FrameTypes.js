var _ = require('lodash')

function strikeFrame() {
    function matches(rolls) {
        return rolls[0] == 10
    }
    function calculateScore(rolls) {
        var frameScore = 10 + rolls[1] + rolls[2]
        var nextRolls = _.drop(rolls, 1);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: matches,
        calculateScore: calculateScore
    }
}

function strikeInLastFrame() {
    function matches(rolls) {
        return isLastFrame(rolls) && rolls[0] == 10
    }
    function calculateScore(rolls) {
        var frameScore = 10 + rolls[1] + rolls[2]
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: matches,
        calculateScore: calculateScore
    }
}

function spareInLastFrame() {
    function matches(rolls) {
        return isLastFrame(rolls) && rolls[0] + rolls[1] == 10
    }
    function calculateSpare(rolls) {
        var frameScore = 10 + rolls[2]
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: matches,
        calculateScore: calculateSpare
    }
}

function spareFrame() {
    function matches(rolls) {
        return rolls[0] + rolls[1] == 10
    }
    function calculateScore(rolls) {
        var frameScore = 10 + rolls[2]
        var nextRolls = _.drop(rolls, 2)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: matches,
        calculateScore: calculateScore
    }
}

function normalFrame() {
    function matches() {
        return true
    }
    function calculateScore(rolls) {
        var frameScore = rolls[0] + rolls[1];
        var nextRolls = _.drop(rolls, 2);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
    return {
        matches: matches,
        calculateScore: calculateScore
    }
}

function isLastFrame(rolls) {
    return rolls[3] === undefined
}

function scoreAndRemainingRolls(frameScore, nextRolls) {
    return {frameScore: frameScore, nextRolls: nextRolls}
}

module.exports = {
    strikeInLastFrame: strikeInLastFrame,
    strikeFrame: strikeFrame,
    spareInLastFrame: spareInLastFrame,
    spareFrame: spareFrame,
    normalFrame: normalFrame,
}