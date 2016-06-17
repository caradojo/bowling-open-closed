var expect = require('chai').expect
var BowlingScoreFactory = require('../src/BowlingScoreFactory')
var _ = require('lodash')

describe('bowling', function () {

    describe('normalRules', function() {
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
    })

    describe('martianRules', function() {
        it('calculates simple score', function() {
            expect(scoreForMartian("000 000 000 000 000 000 000 000 000 000 000 000")).to.equal(0)
            expect(scoreForMartian("123 100 000 000 000 000 000 000 000 000 000 232")).to.equal(6 + 1 + 7)
        })
        it('adds following roll when spare', function() {
            expect(scoreForMartian("127 400 000 000 000 000 000 000 000 000 000 000")).to.equal(14 + 4)
        })
    })



    describe('framesFor', function() {
        it('returns a list of frames', function() {
            var spareInTheEnd = "00 00 00 00 00 00 00 00 00 649"
            expect(framesFor(spareInTheEnd)).to.deep.equal([0, 0, 0, 0, 0, 0 ,0 , 0, 0, 19])
            expect(framesFor("46 00 00 00 00 00 00 00 00 00")).to.deep.equal([10, 0, 0, 0, 0, 0 ,0 , 0, 0, 0])

            var doubleStrikeInLastFrame = "00 00 00 00 00 00 00 00 00 XX0"
            expect(framesFor(doubleStrikeInLastFrame)).to.deep.equal([0, 0, 0, 0, 0, 0 ,0 , 0, 0, 20])
            expect(framesFor("00 00 00 00 00 00 00 00 00 XXX")).to.deep.equal([0, 0, 0, 0, 0, 0 ,0 , 0, 0, 30])
            expect(framesFor("X 00 00 00 00 00 00 00 00 00")).to.deep.equal([10, 0, 0, 0, 0, 0 ,0 , 0, 0, 0])
            expect(framesFor("X X 00 00 00 00 00 00 00 00")).to.deep.equal([20, 10, 0, 0, 0, 0 ,0 , 0, 0, 0])

        })
    })


    it('helper function works', function() {
        expect(makeRollsFromStringRepresentation("00 649"))
            .to.deep.equal([0, 0, 6, 4, 9])
    })

    function framesFor(spareInTheEnd) {
        return BowlingScoreFactory.normalBowling().framesFor(makeRollsFromStringRepresentation(spareInTheEnd))
    }

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
        return BowlingScoreFactory.normalBowling().totalScore(allRolls)
    }
    function scoreForMartian(rolls) {
        var allRolls = makeRollsFromStringRepresentation(rolls)
        return BowlingScoreFactory.martianBowling().totalScore(allRolls)
    }
})