var _ = require('lodash')

function sum(a,b)
{
    return a+b
}

function CurrentFrame(pinsDownArray)
{       
   this.frameFactory = new FrameFactory();
   this.pinsDownArray = pinsDownArray;
}

CurrentFrame.prototype = {
    score : function() {return this.pinsDownArray.reduce(sum, 0);},
       roll : function(newPinsDown){
           return this.frameFactory.create(this.pinsDownArray.concat(newPinsDown));        
       },
       isCurrentFrame : function () { return true;}
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
          createFrames : function(pinsDownArray) { return new ConcatFrame(pinsDownArray)}
      },
      {
          match : function(pinsDownArray) { return isComplete(pinsDownArray)},
          createFrames : function(pinsDownArray) { return new CompleteFrame(pinsDownArray)}
      },
      {
          match : function(pinsDownArray) { return true},
          createFrames : function(pinsDownArray) { return new CurrentFrame(pinsDownArray)}
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

FramesTypes.CurrentFrame = CurrentFrame;
FramesTypes.CompleteFrame = CompleteFrame;

module.exports = FramesTypes