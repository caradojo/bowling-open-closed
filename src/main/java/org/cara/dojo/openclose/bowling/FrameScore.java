package org.cara.dojo.openclose.bowling;

import java.util.ArrayList;
import java.util.List;

public class FrameScore {
  
  private List<Integer> pins = new ArrayList<Integer>();
  private TwoRollsFrameScore frame = new TwoRollsFrameScore();
  
  public void roll(Integer newPins) {
    
    if (frame.shouldListenRoll(pins.size() +1))
    {
      pins.add(newPins);
    }
  }

  public Integer score() {
    return pins.stream().mapToInt(i -> i.intValue()).sum();
  }

}
