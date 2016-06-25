import * as _ from 'lodash'


function isMartianSpare(rolls) {
    return sumOfNext(3, rolls) >= 10
}

function isSpare(rolls) {
    return rolls[0] + rolls[1] == 10
}
function isStrike(rolls) {
    return rolls[0] == 10
}

function sumOfNext(number, rolls) {
    return _.take(rolls, number).reduce(sum);
}

function isLastMartianFrame(rolls) {
    return rolls[4] == undefined
}
function isLastFrame(rolls) {
    return rolls[3] === undefined
}


function sum(a, b) {
    return a + b
}

function always() {
    return true
}

function FrameType(matchesFn, calculateScoreFn) {
    return {
        matches: matchesFn,
        calculateScore: calculateScoreFn
    }
}

function appliesWhen(predicate1, predicate2, etc) {
    var predicates = Array.prototype.slice.call(arguments)
    function matches(rolls) {
        return _.every(predicates, p => p(rolls))
    }

    return {
        sumsUpNextRolls: function (numberOfRolls) {
            return {
                removesRolls: function (numberOfRollsToRemove) {

                    function calculateScore(rolls) {
                        var frameScore = sumOfNext(numberOfRolls, rolls)
                        var nextRolls = _.drop(rolls, numberOfRollsToRemove);
                        return {frameScore: frameScore, nextRolls: nextRolls}
                    }

                    return new FrameType(matches, calculateScore)
                }
            }
        }
    }
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