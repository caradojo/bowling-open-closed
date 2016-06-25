import * as _ from 'lodash'

function sumOfNext(number, rolls) {
    return _.take(rolls, number).reduce(sum);
}

function sum(a, b) {
    return a + b
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

export { appliesWhen}