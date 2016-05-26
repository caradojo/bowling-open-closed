var _ = require('lodash')
var FramesTypes = require('../src/FramesTypes')

function sum(a,b)
{
    return a+b
}

function EmptyFrame()
{
    return {
       score : function() {return 0;},
       roll : function(pinsDown){
           return new IncompleteFrame([pinsDown])
       }
       
    }
}

function IncompleteFrame(pinsDown)
{   
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
           return [new CompleteFrame(pinsDown.concat(newPinsDown)), new EmptyFrame()];
       }       
    }  
}

function CompleteFrame(pinsDown)
{   
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
           return this;
       }       
    }  
}

function FramesTypes()
{
    
}

FramesTypes.EmptyFrame = EmptyFrame;

module.exports = FramesTypes