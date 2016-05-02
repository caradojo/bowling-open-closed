var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')

describe('bowling', function () {

    it('calculates score', function () {
        expect(scoreFor(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(0)
    })

    function scoreFor(roll1, roll2, roll3, etc) {

        function accumulateNextScore(bowlingScore, numberOfPinsKnockedDownInRoll) {
            return bowlingScore.roll(numberOfPinsKnockedDownInRoll)
        }

        var allRolls = Array.prototype.slice.call(arguments);
        var finalBowlingScore = allRolls.reduce(accumulateNextScore, new BowlingScore())

        return finalBowlingScore.score()

    }
})