var BowlingScore = require('./BowlingScore')
var FrameTypes = require('./FrameTypes')
var strikeFrame = FrameTypes.strikeFrame
var strikeInLastFrame = FrameTypes.strikeInLastFrame
var spareInLastFrame = FrameTypes.spareInLastFrame
var spareFrame = FrameTypes.spareFrame
var normalFrame = FrameTypes.normalFrame

function normalBowling() {
    var allFrameTypes = [strikeInLastFrame(), strikeFrame(), spareInLastFrame(), spareFrame(), normalFrame()]

    return new BowlingScore(allFrameTypes)
}

module.exports = {
    normalBowling: normalBowling
}
