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
           if (newPinsArray.length < 4)
           {
               return new StrikeFrame(newPinsArray);
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
    function nextFrame(newPinsDown)
    {
        var newArray = pinsDown.concat(newPinsDown)
        if (newArray.reduce(sum) === 10)
        {
            return new SpareFrame(newArray)
        }
        else
        {
            return new CompleteFrame(newArray)   
        }               
    }
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
           return [nextFrame(newPinsDown), new EmptyFrame()];
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

function SpareFrame(pinsDown)
{   
   return {
       score : function() {return pinsDown.reduce(sum);},
       roll : function(newPinsDown){
            return new CompleteFrame(pinsDown.concat(newPinsDown));            
       }       
    }  
}

function FramesTypes()
{
    
}

FramesTypes.EmptyFrame = EmptyFrame;
FramesTypes.IncompleteFrame = IncompleteFrame;
FramesTypes.CompleteFrame = CompleteFrame;
FramesTypes.SpareFrame = SpareFrame;

module.exports = FramesTypes