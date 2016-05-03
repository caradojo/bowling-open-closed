var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')

describe('bowling', function () {

    it('calculates simple score ', function () {
        expect(scoreFor(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(0)
        expect(scoreFor(1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0)).to.equal(50)
    })

    it.skip('adds following roll when spare', function() {
        var spareRoll = 6
        expect(scoreFor(4, spareRoll, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(19)

    })

    it('strike', function() {

    })

    it('lastFrame', function() {

    })

    function scoreFor(roll1, roll2, roll3, etc) {

        function accumulateNextScore(bowlingScore, numberOfPinsKnockedDownInRoll) {
            return bowlingScore.roll(numberOfPinsKnockedDownInRoll)
        }

        var allRolls = Array.prototype.slice.call(arguments);
        var finalBowlingScore = allRolls.reduce(accumulateNextScore, new BowlingScore(0, []))

        return finalBowlingScore.score()

    }
})