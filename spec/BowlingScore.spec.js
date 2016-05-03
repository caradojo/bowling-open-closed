var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')
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

    })

    it('lastFrame', function() {

    })

    it('toto', function() {
        //var last = _.takeRight([1, 2, 3], 1)
        //expect(last).to.be.instanceof(Number)

        expect(new BowlingScore(0 , []).isSpare([6, 4, 3])).to.be.true
        //expect(_.chain([1, 2, 3]).takeRight(2).value()).to.equal([2, 3])
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