var expect = require('chai').expect
var FramesTypes = require('../src/FramesTypes')
var EmptyFrame = FramesTypes.EmptyFrame
var CurrentFrame = FramesTypes.CurrentFrame
var CompleteFrame = FramesTypes.CompleteFrame
var _ = require('lodash')

describe('bowling frames', function () {

    
     it('incomplete frames', function () {       
        var f1 = new CurrentFrame([6])
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