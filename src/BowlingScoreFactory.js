import BowlingScore from './BowlingScore'
import {strikeFrame, strikeInLastFrame, spareInLastFrame, spareFrame, normalFrame} from './FrameTypes'
import {martianNormalFrame, martianSpareFrame, martianSpareInLastFrame, martianStrikeInLastFrame} from './FrameTypes'

function normalBowling() {
    var allFrameTypes = [new strikeInLastFrame(), new strikeFrame(), new spareInLastFrame(), new spareFrame(), new normalFrame()]
    return new BowlingScore(allFrameTypes)
}


function martianBowling() {
    var allFrameTypes = [martianStrikeInLastFrame, new strikeFrame(), martianSpareInLastFrame, martianSpareFrame, new martianNormalFrame()]
    return new BowlingScore(allFrameTypes)
}

export  {
    normalBowling,
    martianBowling
}
