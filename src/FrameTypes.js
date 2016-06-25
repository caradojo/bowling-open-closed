import * as _ from 'lodash'
import {appliesWhen} from './FrameTypeBuilder'

function isMartianSpare(rolls) {
    return rolls[0] + rolls[1] + rolls[2] >= 10
}

function isSpare(rolls) {
    return rolls[0] + rolls[1] == 10
}
function isStrike(rolls) {
    return rolls[0] == 10
}

function isLastMartianFrame(rolls) {
    return rolls[4] == undefined
}
function isLastFrame(rolls) {
    return rolls[3] === undefined
}

function always() {
    return true
}

var strikeFrame =
    appliesWhen(isStrike)
        .sumsUpNextRolls(3)
        .removesRolls(1)


var strikeInLastFrame =
    appliesWhen(isLastFrame, isStrike)
        .sumsUpNextRolls(3)
        .removesRolls(3)

var spareInLastFrame =
    appliesWhen(isLastFrame, isSpare)
        .sumsUpNextRolls(3)
        .removesRolls(3)

var spareFrame =
    appliesWhen(isSpare)
        .sumsUpNextRolls(3)
        .removesRolls(2)

var normalFrame =
    appliesWhen(always)
        .sumsUpNextRolls(2)
        .removesRolls(2)

var martianNormalFrame =
    appliesWhen(always)
        .sumsUpNextRolls(3)
        .removesRolls(3)

var martianSpareFrame =
    appliesWhen(isMartianSpare)
        .sumsUpNextRolls(4)
        .removesRolls(3)

var martianStrikeInLastFrame =
    appliesWhen(isStrike, isLastMartianFrame)
        .sumsUpNextRolls(4)
        .removesRolls(4)

var martianSpareInLastFrame =
    appliesWhen(isMartianSpare, isLastMartianFrame)
        .sumsUpNextRolls(4)
        .removesRolls(4)


export {
    strikeInLastFrame,
    strikeFrame,
    spareInLastFrame,
    spareFrame,
    normalFrame,
    martianNormalFrame,
    martianSpareFrame,
    martianSpareInLastFrame,
    martianStrikeInLastFrame
}