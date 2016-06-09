var _ = require('lodash')

function sum(a,b)
{
    return a+b
}

function ConcatFrame(pinsDown)
{
    return {
       score : function() {return pinsDown.reduce(sum)},
       roll : function(newPinsDown){
           var newPinsArray = pinsDown.concat(newPinsDown);
           if (newPinsArray.length < 4)
           {
               return new ConcatFrame(newPinsArray);
           }
           else{
               return this
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
               return [new ConcatFrame([pinsDown]),new EmptyFrame()];
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
    function nextFrame(newPinsDown)
    {
        var newArray = pinsDown.concat(newPinsDown)
        if (newArray.reduce(sum) === 10)
        {
            return [new ConcatFrame(newArray), new EmptyFrame()]
        }
       
        if (newArray.length == 2)
        {        
            return [new CompleteFrame(newArray), new EmptyFrame()]
        }  

        return new IncompleteFrame(newPinsDown)
    }
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
           return nextFrame(newPinsDown);
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
FramesTypes.IncompleteFrame = IncompleteFrame;
FramesTypes.CompleteFrame = CompleteFrame;

module.exports = FramesTypes