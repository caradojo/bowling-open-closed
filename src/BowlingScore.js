var _ = require('lodash')
var FramesTypes = require('../src/FramesTypes')
var CurrentPlayedFrame = FramesTypes.CurrentPlayedFrame;

function lastIsNotCurrentFrame(frames)
{
    return frames.length === 0 || !(frames[frames.length-1] instanceof CurrentPlayedFrame)
}

function createCurrenFrameIfNeeded(frames){
        if (lastIsNotCurrentFrame(frames) && frames.length < 10)
        {
            return frames.concat(new CurrentPlayedFrame([]));
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

module.exports = BowlingScore
