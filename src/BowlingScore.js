var _ = require('lodash')

function BowlingScore(currentScore, allRolls, allFrames, currentFrame) {
    this.currentScore = currentScore
    this.allRolls = allRolls
    this.allFrames = allFrames
    this.currentFrame = currentFrame
    this.rollTypes = [
        strikeCalculator(currentScore),
        spareCalculator(currentScore),
        normalCalculator(currentScore)]
}

function EmptyFrame() {
    return {
        roll: function (pinsKnockedDown) {
            return new FirstRollFrame(pinsKnockedDown)
        },
        isReady: function () {
            return false
        },
        next: function(){
            return this
        }
        
        

    }
}

function FirstRollFrame(pinsDown) {
    return {
        roll: function (pinsKnockedDown) {
            return new NormalFrameComplete([pinsDown, pinsKnockedDown])
        },
        isReady: function () {
            return false
        },
        next: function(){
            return this
        }
    }
}

function NormalFrameComplete(pinsDownArray) {
    return {
        roll: function () {
            throw new Error('Cant roll on a completed frame')
        },
        isReady: function () {
            return true
        },
        next: function(){
            return new EmptyFrame()
        },
        isStrike: function()
        {
            return pinsDownArray[0] == 10
        },
        isSpare: function()
        {
            return !this.isStrike() 
                && pinsDownArray[0] + pinsDownArray[1] == 10
        },
        score:function()
        {
            return _.chain(pinsDownArray).sum().value()
        }
        
    }
}



BowlingScore.prototype = {

    roll: function (pinsKnockedDown) {

        var newAllRolls = this.allRolls.concat(pinsKnockedDown)

        this.currentFrame = this.currentFrame.roll(pinsKnockedDown)
        var newAllFrames = this.allFrames
        if(this.currentFrame.isReady()){
            newAllFrames = this.allFrames.concat(this.currentFrame)
        }
        
        var selectedRollType = _.find(this.rollTypes, function (rollType) {
            return rollType.matches(newAllRolls, newAllFrames)
        })

        var newCurrentScore = selectedRollType.calculateScore(newAllRolls)

        return new BowlingScore(newCurrentScore, newAllRolls, newAllFrames, this.currentFrame.next())
    },

    score: function () { 
        return this.currentScore
    }
}

function strikeCalculator(currentScore) {
    function isStrike(newAllRolls) {
        var isEvenRoll = newAllRolls.length % 2 === 0
        var roll2Before = _.chain(newAllRolls).dropRight(3).last().value()
        return isEvenRoll && roll2Before === 10
    }

    return {
        matches: function (newAllRolls, newAllFrames) {
            return isStrike(newAllRolls)
        },
        calculateScore: function (newAllRolls) {
            var bonus = _.chain(newAllRolls).takeRight(2).sum().value()
            return currentScore + bonus + _.last(newAllRolls)
        }
    }
}

function spareCalculator(currentScore) {

    function previousIsSpare(newAllFrames) {               
        var lastFrame = _.chain(newAllFrames).dropRight().last().value()        
        return newAllFrames.length >=2 && lastFrame.isSpare()
    }

    return {
        matches: function (newAllRolls, newAllFrames) {
            return previousIsSpare(newAllFrames)
        },
        calculateScore: function (newAllRolls) {
            var pinsKnockedDown = _.last(newAllRolls)
            return currentScore + pinsKnockedDown * 2
        }
    }
}

function normalCalculator(currentScore) {
    return {
        matches: function (newAllRolls, newAllFrames) {
            return true
        },
        calculateScore: function (newAllRolls) {
            var pinsKnockedDown = _.last(newAllRolls)

            return currentScore + pinsKnockedDown
        }
    }
}


BowlingScore.spareCalculator = spareCalculator
BowlingScore.EmptyFrame = EmptyFrame
BowlingScore.NormalFrameComplete = NormalFrameComplete

module.exports = BowlingScore
