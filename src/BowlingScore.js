var _ = require('lodash')

function BowlingScore(frameTypes) {

    function framesFor(remainingRolls) {
        if (remainingRolls.length === 0) return []

        var frameType = findFirstMatchingFrameType(remainingRolls)

        var scoreAndNextRolls = frameType.calculateScore(remainingRolls)

        var nextFrameScores = framesFor(scoreAndNextRolls.nextRolls)
        return [scoreAndNextRolls.frameScore].concat(nextFrameScores)
    }

    function totalScore(allRolls) {
        var framesScores = framesFor(allRolls)
        return framesScores.reduce(sum)
    }

    function findFirstMatchingFrameType(rolls) {
        function matchesCurrentFrame(frameType) {
            return frameType.matches(rolls)
        }
        return _.find(frameTypes, matchesCurrentFrame)
    }

    function sum(a, b) {
        return a + b
    }

    return {
        framesFor: framesFor,
        totalScore: totalScore
    }
}


module.exports = BowlingScore
