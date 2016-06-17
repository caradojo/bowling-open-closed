var _ = require('lodash')

function sum(a,b)
{
    return a+b
}

function CurrentPlayedFrame(pinsDownArray)
{       
   this.frameFactory = new FrameFactory();
   this.pinsDownArray = pinsDownArray;
}

CurrentPlayedFrame.prototype = {
    score : function() {return this.pinsDownArray.reduce(sum, 0);},
    roll : function(newPinsDown){
        return this.frameFactory.create(this.pinsDownArray.concat(newPinsDown));        
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
   function isSpareOrStrike(pinsDownArray)
   {
       return pinsDownArray.reduce(sum) === 10
   }
   function isComplete(pinsDownArray)
   {
       return pinsDownArray.length == 2
   }
   var rules = [
      {
          match : function(pinsDownArray) { return isSpareOrStrike(pinsDownArray)},
          createFrames : function(pinsDownArray) { return new ConcatFrame(pinsDownArray)}
      },
      {
          match : function(pinsDownArray) { return isComplete(pinsDownArray)},
          createFrames : function(pinsDownArray) { return new CompleteFrame(pinsDownArray)}
      },
      {
          match : function(pinsDownArray) { return true},
          createFrames : function(pinsDownArray) { return new CurrentPlayedFrame(pinsDownArray)}
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



function FramesTypes()
{
    
}

FramesTypes.CurrentPlayedFrame = CurrentPlayedFrame;
FramesTypes.CompleteFrame = CompleteFrame;

module.exports = FramesTypes