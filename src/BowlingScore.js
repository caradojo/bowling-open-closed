var _ = require('lodash')
var FramesTypes = require('../src/FramesTypes')
var CurrentFrame = FramesTypes.CurrentFrame;


function lastIsNotCurrentFrame(frames)
{
    return frames.length === 0 || !frames[frames.length-1].isCurrentFrame
}

function createCurrenFrameIfNeeded(frames){
        if (lastIsNotCurrentFrame(frames))
        {
            return frames.concat(new CurrentFrame([]));
        }
        return frames;
}


function BowlingScore(frames) {        
    this.allFrames = createCurrenFrameIfNeeded(frames);
}

BowlingScore.prototype = {

    roll: function (pinsKnockedDown) {
        
        var newAllFrames = [];
        for (var i = 0; i < this.allFrames.length; i++)
        {
            newAllFrames = newAllFrames.concat(this.allFrames[i].roll(pinsKnockedDown));
        }
        
        return new BowlingScore(createCurrenFrameIfNeeded(newAllFrames));      
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

BowlingScore.CurrentFrame = CurrentFrame
module.exports = BowlingScore
