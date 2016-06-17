var _ = require('lodash')
var FramesTypes = require('../src/FramesTypes')
var CurrentFrame = FramesTypes.CurrentFrame;


function lastIsNotCurrentFrame(frames)
{
    return frames.length === 0 || !(frames[frames.length-1] instanceof CurrentFrame)
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
        
        var newAllFrames = this.allFrames.map(function(s) { return s.roll(pinsKnockedDown)});        
        
        return new BowlingScore(createCurrenFrameIfNeeded(newAllFrames));      
    },

    score: function () {
        return this.allFrames.reduce(function(a,b) {return a+b.score() },0)
    }
}

BowlingScore.CurrentFrame = CurrentFrame
module.exports = BowlingScore
