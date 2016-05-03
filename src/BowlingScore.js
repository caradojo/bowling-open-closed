var _ = require('lodash')

function BowlingScore(currentScore, allRolls) {
    this.currentScore = currentScore
    this.allRolls = allRolls
}

BowlingScore.prototype = {

    isSpare: function (newAllRolls) {
        var isOddRoll = newAllRolls.length % 2 === 1
        var sumOfLastFrame = _.chain(newAllRolls).dropRight().takeRight(2).sum().value()
        return isOddRoll && sumOfLastFrame === 10
    },

    roll: function (pinsKnockedDown) {

        var newAllRolls = this.allRolls.concat(pinsKnockedDown)

        var currentScore;
        if (this.isSpare(newAllRolls)) {
            currentScore = this.currentScore + pinsKnockedDown * 2;
        } else {
            currentScore = this.currentScore + pinsKnockedDown;

        }
        return new BowlingScore(currentScore, newAllRolls)
    },

    score: function () {
        return this.currentScore
    }


}


module.exports = BowlingScore