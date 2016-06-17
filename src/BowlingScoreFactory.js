import BowlingScore from './BowlingScore'
import {strikeFrame, strikeInLastFrame, spareInLastFrame, spareFrame, normalFrame} from './FrameTypes'
import {martianNormalFrame, martianSpareFrame, martianSpareInLastFrame} from './FrameTypes'

function normalBowling() {
    var allFrameTypes = [new strikeInLastFrame(), new strikeFrame(), new spareInLastFrame(), new spareFrame(), new normalFrame()]
    return new BowlingScore(allFrameTypes)
}


function martianBowling() {
    var allFrameTypes = [ new strikeFrame(), new martianSpareInLastFrame(), new martianSpareFrame(), new martianNormalFrame()]

    return new BowlingScore(allFrameTypes)
}

module.exports = {
    normalBowling: normalBowling,
    martianBowling: martianBowling
}
