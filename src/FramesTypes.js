var _ = require('lodash')

function sum(a,b)
{
    return a+b
}

function StrikeFrame(pinsDown)
{
    return {
       score : function() {return pinsDown.reduce(sum)},
       roll : function(newPinsDown){
           var newPinsArray = pinsDown.concat(newPinsDown);
           if (newPinsArray.length < 3)
           {
               return new StrikeFrame(newPinsArray);
           }
           else{
               return new ClosedFrame(newPinsArray)
           }
       }
       
    } 
}

function EmptyFrame()
{
    return {
       score : function() {return 0;},
       roll : function(pinsDown){
           if (pinsDown === 10)
           {
               return [new StrikeFrame([pinsDown]),new EmptyFrame()];
           }
           else
           {
               return new IncompleteFrame([pinsDown])
           }
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

function ClosedFrame(pinsDown)
{
     return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
           return this;            
       }       
    }  
}

function CompleteFrame(pinsDown)
{   
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
            if (this.score() === 10)
            {
               return new ClosedFrame(pinsDown.concat(newPinsDown));
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