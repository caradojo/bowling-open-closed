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

function FrameFactory()
{
   function isSpecial(pinsDownArray)
   {
       return pinsDownArray.reduce(sum) === 10
   }
   function isComplete(pinsDownArray)
   {
       return pinsDownArray.length == 2
   }
   var rules = [
      {
          match : function(pinsDownArray) { return isSpecial(pinsDownArray)},
          createFrames : function(pinsDownArray) { return [new ConcatFrame(pinsDownArray), new CurrentFrame([])]}
      },
      {
          match : function(pinsDownArray) { return isComplete(pinsDownArray)},
          createFrames : function(pinsDownArray) { return [new CompleteFrame(pinsDownArray),new CurrentFrame([])]}
      },
      {
          match : function(pinsDownArray) { return true},
          createFrames : function(pinsDownArray) { return [new CurrentFrame(pinsDownArray)]}
      },
   ]
   return {
     create:function(pinsDownArray)
     {
            function matchesCurrentFrame (rule) {
            return rule.match(pinsDownArray)
        }
        return  _.find(rules, matchesCurrentFrame).createFrames(pinsDownArray)
     }
   }
}

function CurrentFrame(pinsDownArray)
{       
   var frameFactory = new FrameFactory();
   return {
       score : function() {return pinsDownArray.reduce(sum, 0);},
       roll : function(newPinsDown){
           return frameFactory.create(pinsDownArray.concat(newPinsDown));
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