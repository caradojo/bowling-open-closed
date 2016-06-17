var BowlingScore = require('./BowlingScore')
var FrameTypes = require('./FrameTypes')
var strikeFrame = FrameTypes.strikeFrame
var strikeInLastFrame = FrameTypes.strikeInLastFrame
var spareInLastFrame = FrameTypes.spareInLastFrame
var spareFrame = FrameTypes.spareFrame
var normalFrame = FrameTypes.normalFrame
var martianSpareFrame = FrameTypes.martianSpareFrame
var martianNormalFrame = FrameTypes.martianNormalFrame

function normalBowling() {
    var allFrameTypes = [strikeInLastFrame(), strikeFrame(), spareInLastFrame(), spareFrame(), normalFrame()]

    return new BowlingScore(allFrameTypes)
}


function martianBowling() {
    var allFrameTypes = [ new martianNormalFrame()]

    return new BowlingScore(allFrameTypes)
}

module.exports = {
    normalBowling: normalBowling,
    martianBowling: martianBowling
}
