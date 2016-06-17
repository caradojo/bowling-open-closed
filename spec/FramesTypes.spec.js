var expect = require('chai').expect
var FramesTypes = require('../src/FramesTypes')
var EmptyFrame = FramesTypes.EmptyFrame
var CurrentPlayedFrame = FramesTypes.CurrentPlayedFrame
var CompleteFrame = FramesTypes.CompleteFrame
var _ = require('lodash')

describe('bowling frames', function () {

    
     it('CurrentPlayedFrame frames', function () {       
        var f1 = new CurrentPlayedFrame([6])
        expect(f1.score() ).to.equal(6)
        var newFrames = f1.roll(4);
        expect(newFrames.score()).to.equal(10)  

        expect(f1 instanceof CurrentPlayedFrame).to.equal(true)    
    })
    
    it('complete frames', function () { 
        var init = [6,1]      
        var f1 = new CompleteFrame(init)
        expect(f1.score() ).to.equal(7)        
    })
    
})