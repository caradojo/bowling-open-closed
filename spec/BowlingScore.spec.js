var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')
var EmptyFrame = BowlingScore.EmptyFrame
var _ = require('lodash')

describe('bowling', function () {

    it('calculates simple score ', function () {
        expect(scoreFor(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(0)
        expect(scoreFor(1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0)).to.equal(50)
    })

    it('adds following roll when spare', function() {
        var spareRoll = 6
        expect(scoreFor(4, spareRoll, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(19)
        var notASare = 8
        expect(scoreFor(4, 2, notASare, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(15)
    })

    it('strike', function() {
        var strike = 10
        expect(scoreFor(6, 0, 3, 0, strike, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.equal(37)

    })

    it('lastFrame', function() {

    })

    it('isSpare', function() {
        expect(BowlingScore.spareCalculator(0).matches([6, 4, 3])).to.be.true
        expect(BowlingScore.spareCalculator(0 ).matches([10, 0, 4,])).to.be.false
    })

    function scoreFor(roll1, roll2, roll3, etc) {

        function accumulateNextScore(bowlingScore, numberOfPinsKnockedDownInRoll) {
            return bowlingScore.roll(numberOfPinsKnockedDownInRoll)
        }

        var allRolls = Array.prototype.slice.call(arguments);
        var finalBowlingScore = allRolls.reduce(accumulateNextScore, new BowlingScore(0, [], [], new EmptyFrame()))

        return finalBowlingScore.score()

    }
})