import * as _ from 'lodash'


function appliesWhen(predicate1, predicate2, etc) {
    var predicates = Array.prototype.slice.call(arguments);
    return {
        sumsUpNextRolls: function (numberOfRolls) {
            return {
                removesRolls: function (numberOfRollsToRemove) {
                    return {
                        matches: function (rolls) {

                            return _.every(predicates, function (p) {return p(rolls)})
                            //return predicate1(rolls) && predicate2(rolls)
                        },
                        calculateScore: function (rolls) {
                            var frameScore = sumOfNext(numberOfRolls, rolls)
                            var nextRolls = _.drop(rolls, numberOfRollsToRemove);
                            return scoreAndRemainingRolls(frameScore, nextRolls)
                        }
                    }
                }
            }
        }
    }
}

class strikeFrame {
    matches(rolls) {
        return isStrike(rolls)
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 1);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class strikeInLastFrame {
    matches(rolls) {
        return isLastFrame(rolls) && isStrike(rolls)
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class spareInLastFrame {
    matches(rolls) {
        return isLastFrame(rolls) && isSpare(rolls)
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class spareFrame {
    matches(rolls) {
        return isSpare(rolls)
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls)
        var nextRolls = _.drop(rolls, 2)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class normalFrame {
    matches() {
        return true
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(2, rolls);
        var nextRolls = _.drop(rolls, 2);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class martianNormalFrame {
    matches() {
        return true
    }

    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls)
        var nextRolls = _.drop(rolls, 3);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}


var martianSpareFrame =
    appliesWhen(isMartianSpare, () => true)
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
function sum(a, b) {
    return a + b
}

function isLastMartianFrame(rolls) {
    return rolls[4] == undefined
}
function isLastFrame(rolls) {
    return rolls[3] === undefined
}

function scoreAndRemainingRolls(frameScore, nextRolls) {
    return {frameScore: frameScore, nextRolls: nextRolls}
}

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