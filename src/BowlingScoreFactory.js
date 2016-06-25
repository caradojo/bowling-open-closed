import BowlingScore from './BowlingScore'
import {strikeFrame, strikeInLastFrame, spareInLastFrame, spareFrame, normalFrame} from './FrameTypes'
import {martianNormalFrame, martianSpareFrame, martianSpareInLastFrame, martianStrikeInLastFrame} from './FrameTypes'

function normalBowling() {
    var allFrameTypes = [strikeInLastFrame, strikeFrame, spareInLastFrame, spareFrame, normalFrame]
    return new BowlingScore(allFrameTypes)
}


function martianBowling() {
    var allFrameTypes = [martianStrikeInLastFrame, strikeFrame, martianSpareInLastFrame, martianSpareFrame, martianNormalFrame]
    return new BowlingScore(allFrameTypes)
}

export  {
    normalBowling,
    martianBowling
}
