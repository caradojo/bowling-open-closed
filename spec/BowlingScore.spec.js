var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')
var _ = require('lodash')

describe('bowling', function () {

    it('calculates simple score ', function () {
        expect(scoreFor("00 00 00 00 00 00 00 00 00 00")).to.equal(0)
        expect(scoreFor("12 34 54 32 10 12 34 54 32 10")).to.equal(50)
    })

    it('adds following roll when spare', function () {
        expect(scoreFor("46 33 00 00 00 00 00 00 00 00")).to.equal(13 + 6)
        expect(scoreFor("42 81 00 00 00 00 00 00 00 00")).to.equal(6 + 9)
        expect(scoreFor("00 00 00 00 00 00 00 00 00 640")).to.equal(10)
        expect(scoreFor("00 00 00 00 00 00 00 00 00 649")).to.equal(19)
    })

    it('strike', function () {
        expect(scoreFor("60 30 X 45 00 00 00 00 00 00")).to.equal(6+ 3 + 19 + 9)
        expect(scoreFor("00 00 00 00 00 00 00 00 00 XXX")).to.equal(30)
    })

    function framesFor(spareInTheEnd) {
        return BowlingScore.framesFor(makeRollsFromStringRepresentation(spareInTheEnd))
    }

    it('returns a list of frames', function() {
        var spareInTheEnd = "00 00 00 00 00 00 00 00 00 649"
        expect(framesFor(spareInTheEnd)).to.deep.equal([0, 0, 0, 0, 0, 0 ,0 , 0, 0, 19])
        expect(framesFor("46 00 00 00 00 00 00 00 00 00")).to.deep.equal([10, 0, 0, 0, 0, 0 ,0 , 0, 0, 0])

        var doubleStrikeInLastFrame = "00 00 00 00 00 00 00 00 00 XX0"
        //expect(framesFor(doubleStrikeInLastFrame)).to.deep.equal([0, 0, 0, 0, 0, 0 ,0 , 0, 0, 20])
    })

    it('helper function works', function() {
        expect(makeRollsFromStringRepresentation("00 649"))
            .to.deep.equal([0, 0, 6, 4, 9])
    })

    function parseToInteger(n) {
        if (n === 'X') {
            return 10
        }
        return Number.parseInt(n)
    }

    function makeRollsFromStringRepresentation(rolls) {
        return rolls.replace(/ /g, "").split('').map(parseToInteger)
    }

    function scoreFor(rolls) {
        var allRolls = makeRollsFromStringRepresentation(rolls)
        return BowlingScore.totalScore(allRolls)
    }
})