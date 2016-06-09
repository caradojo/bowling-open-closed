var expect = require('chai').expect
var FramesTypes = require('../src/FramesTypes')
var EmptyFrame = FramesTypes.EmptyFrame
var IncompleteFrame = FramesTypes.IncompleteFrame
var CompleteFrame = FramesTypes.CompleteFrame
var _ = require('lodash')

describe('bowling frames', function () {

   it('empty frames', function () {       
        var f1 = new EmptyFrame()
        expect(f1.score() ).to.equal(0)
        expect(f1.roll(1).score()).to.equal(1)
    })
    
     it('incomplete frames', function () {       
        var f1 = new IncompleteFrame([6])
        expect(f1.score() ).to.equal(6)
        var newFrames = f1.roll(4);
        expect(newFrames[0].score()).to.equal(10)
        expect(newFrames[1].score()).to.equal(0)
        
    })
    
    it('complete frames', function () { 
        var init = [6,1]      
        var f1 = new CompleteFrame(init)
        expect(f1.score() ).to.equal(7)        
        
    })
    
})