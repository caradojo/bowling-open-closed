import * as _ from 'lodash'

class strikeFrame {
    matches(rolls) {
        return rolls[0] == 10
    }
    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 1);
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class strikeInLastFrame {
    matches(rolls) {
        return isLastFrame(rolls) && rolls[0] == 10
    }
    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class spareInLastFrame {
    matches(rolls) {
        return isLastFrame(rolls) && rolls[0] + rolls[1] == 10
    }
    calculateScore(rolls) {
        var frameScore = sumOfNext(3, rolls);
        var nextRolls = _.drop(rolls, 3)
        return scoreAndRemainingRolls(frameScore, nextRolls)
    }
}

class spareFrame {
    matches(rolls) {
        return rolls[0] + rolls[1] == 10
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

function sumOfNext(number, rolls) {
    return _.take(rolls, number).reduce(sum);
}
function sum(a, b) { return a + b}

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
    martianNormalFrame
}