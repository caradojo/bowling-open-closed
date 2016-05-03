var _ = require('lodash')

function BowlingScore(currentScore, allRolls) {
    this.currentScore = currentScore
    this.allRolls = allRolls
    this.rollTypes = [{
        matches: function (newAllRolls) {
            return isStrike(newAllRolls)
        },
        calculateScore: function (newAllRolls) {
            var bonus = _.chain(newAllRolls).takeRight(2).sum().value()
            return currentScore + bonus + _.last(newAllRolls)
        }
    }, {
        matches: function (newAllRolls) {
            return isSpare(newAllRolls)
        },
        calculateScore: function (newAllRolls) {
            var pinsKnockedDown = _.last(newAllRolls)
            return currentScore + pinsKnockedDown * 2
        }
    }, {
        matches: function (newAllRolls) {
            return true
        },
        calculateScore: function (newAllRolls) {
            var pinsKnockedDown = _.last(newAllRolls)

            return currentScore + pinsKnockedDown
        }
    }]
}
function isStrike(newAllRolls) {
    var isEvenRoll = newAllRolls.length % 2 === 0
    var roll2Before = _.chain(newAllRolls).dropRight(3).last().value()
    return isEvenRoll && roll2Before === 10
}

function isSpare(newAllRolls) {
    var isOddRoll = newAllRolls.length % 2 === 1
    var sumOfLastFrame = _.chain(newAllRolls).dropRight().takeRight(2).sum().value()
    return isOddRoll && sumOfLastFrame === 10
}

BowlingScore.prototype = {


    isSpare: isSpare,

    roll: function (pinsKnockedDown) {

        var newAllRolls = this.allRolls.concat(pinsKnockedDown)

        var selectedRollType = _.find(this.rollTypes, function (rollType) {
            return rollType.matches(newAllRolls)
        })

        var newCurrentScore = selectedRollType.calculateScore(newAllRolls)
        return new BowlingScore(newCurrentScore, newAllRolls)
    },

    score: function () {
        return this.currentScore
    }


}


module.exports = BowlingScore