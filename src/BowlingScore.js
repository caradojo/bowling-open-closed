var _ = require('lodash')
var FramesTypes = require('../src/FramesTypes')
var EmptyFrame = FramesTypes.EmptyFrame;

function BowlingScore(frames) {    
    this.allFrames = frames
}

BowlingScore.prototype = {

    roll: function (pinsKnockedDown) {
        
        var newAllFrames = [];
        for (var i = 0; i < this.allFrames.length; i++)
        {
            newAllFrames = newAllFrames.concat(this.allFrames[i].roll(pinsKnockedDown));
        }
        
        return new BowlingScore(newAllFrames);      
    },

    score: function () {
        var sum = 0;
        for (var i = 0; i < this.allFrames.length; i++)
        {
            sum = sum + this.allFrames[i].score();
        } 
        return sum;
    }
}
/*
function EmptyFrame() {
    return {
        roll: function (pinsKnockedDown) {
            return new FirstPinFrame(pinsKnockedDown)
        },
        isReady: function () {
            return false
        }

    }
}

function FirstPinFrame() {
    return {
        roll: function (pinsKnockedDown) {
            return new NormalFrameComplete(pinsKnockedDown)
        },
        isReady: function () {
            return false
        }
    }
}

function NormalFrameComplete() {
    return {
        roll: function () {
            throw new Error('Cant roll on a completed frame')
        },
        isReady: function () {
            return true
        }
    }
}



BowlingScore.prototype = {

    roll: function (pinsKnockedDown) {

        var newAllRolls = this.allRolls.concat(pinsKnockedDown)

        var selectedRollType = _.find(this.rollTypes, function (rollType) {
            return rollType.matches(newAllRolls)
        })

        var currentFrame = this.currentFrame

        var nextFrame = currentFrame.roll(pinsKnockedDown)

        var newCurrentScore = selectedRollType.calculateScore(newAllRolls)

        if(nextFrame.isReady()){
            var newAllFrames = this.allFrames.concat(nextFrame)
            return new BowlingScore(newCurrentScore, newAllRolls, newAllFrames, new EmptyFrame())
        } else {
            var newAllFrames = this.allFrames
            return new BowlingScore(newCurrentScore, newAllRolls, newAllFrames, nextFrame)
        }
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
        matches: function (newAllRolls) {
            return isStrike(newAllRolls)
        },
        calculateScore: function (newAllRolls) {
            var bonus = _.chain(newAllRolls).takeRight(2).sum().value()
            return currentScore + bonus + _.last(newAllRolls)
        }
    }
}

function spareCalculator(currentScore) {

    function isSpare(newAllRolls) {
        function isNotStrike(lastFrame) {
            return _.first(lastFrame) !== 10
        }
        var isOddRoll = newAllRolls.length % 2 === 1
        var lastFrame = _.chain(newAllRolls).dropRight().takeRight(2).value()
        var sumOfLastFrame = _.sum(lastFrame)
        return isOddRoll && sumOfLastFrame === 10 && isNotStrike(lastFrame)
    }

    return {
        matches: function (newAllRolls) {
            return isSpare(newAllRolls)
        },
        calculateScore: function (newAllRolls) {
            var pinsKnockedDown = _.last(newAllRolls)
            return currentScore + pinsKnockedDown * 2
        }
    }
}

function normalCalculator(currentScore) {
    return {
        matches: function (newAllRolls) {
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
*/
BowlingScore.EmptyFrame = EmptyFrame
module.exports = BowlingScore
