var expect = require('chai').expect
var BowlingScore = require('../src/BowlingScore')
var _ = require('lodash')

describe('bowling', function () {

    it('calculates simple score ', function () {
        expect(scoreFor("00 00 00 00 00 00 00 00 00 00")).to.equal(0)
        expect(scoreFor("12 34 54 32 10 12 34 54 32 10")).to.equal(50)
        expect(scoreFor("12 3")).to.equal(6)       
    })

    it('adds following roll when spare', function () {
        expect(scoreFor("46 33 00 00 00 00 00 00 00 00")).to.equal(13 + 6)
        expect(scoreFor("42 81 00 00 00 00 00 00 00 00")).to.equal(6 + 9)
        expect(scoreFor("46 3")).to.equal(13+3)  
    })

    it('strike', function () {
        expect(scoreFor("60 30 X 45 00 00 00 00 00 00")).to.equal(6+ 3 + 19 + 9)
        expect(scoreFor("00 00 00 00 00 00 00 00 00 XXX")).to.equal(30)
    })

    function parseToInteger(n) {
        if (n === 'X') {
            return 10
        }
        return Number.parseInt(n)
    }

    function scoreFor(rolls) {
        var allRolls = rolls.replace(/ /g, "").split('').map(parseToInteger)
        return BowlingScore.totalScore(allRolls)
    }
})