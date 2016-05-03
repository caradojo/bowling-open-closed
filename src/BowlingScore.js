function BowlingScore(currentScore, allRolls) {
    this.currentScore = currentScore
    this.allRolls = allRolls
}

BowlingScore.prototype = {

    roll: function (pinsKnockedDown) {
        var newAllRolls = this.allRolls.concat(pinsKnockedDown)
        return new BowlingScore(this.currentScore + pinsKnockedDown, newAllRolls)
    },

    score: function () {
        return this.currentScore
    }


}


module.exports = BowlingScore