var _ = require('lodash')

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
            if (pinsDown.length === 2 && this.score() === 10)
            {
               return new CompleteFrame(pinsDown.concat(newPinsDown));
            }
            else
            {
                return this;
            }
       }       
    }  
}

function FramesTypes()
{
    
}

FramesTypes.EmptyFrame = EmptyFrame;
FramesTypes.IncompleteFrame = IncompleteFrame;
FramesTypes.CompleteFrame = CompleteFrame;

module.exports = FramesTypes