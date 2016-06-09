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
           if (pinsDown.length < 3)
           {
                var newPinsArray = pinsDown.concat(newPinsDown);               
               return new ConcatFrame(newPinsArray);
           }
           else{
               return this
           }
       }
       
    } 
}

function CurrentFrame(pinsDownArray)
{   
    function nextFrame(newPinsDown)
    {
        var newArray = pinsDownArray.concat(newPinsDown)
        if (newArray.reduce(sum) === 10)
        {
            return [new ConcatFrame(newArray), new CurrentFrame([])]
        }
       
        if (newArray.length == 2)
        {        
            return [new CompleteFrame(newArray),new CurrentFrame([])]
        }  

        return new CurrentFrame(newArray)
    }
   return {
       score : function() {return pinsDownArray.reduce(sum, 0);},
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

FramesTypes.CurrentFrame = CurrentFrame;
FramesTypes.CompleteFrame = CompleteFrame;

module.exports = FramesTypes