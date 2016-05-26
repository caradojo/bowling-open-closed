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

BowlingScore.EmptyFrame = EmptyFrame
module.exports = BowlingScore
