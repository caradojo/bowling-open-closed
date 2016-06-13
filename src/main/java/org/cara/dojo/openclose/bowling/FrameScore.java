package org.cara.dojo.openclose.bowling;

import java.util.ArrayList;
import java.util.List;

public class FrameScore {
  
  private List<Integer> pins = new ArrayList<Integer>();
  private IFrameScore frame = new TwoRollsFrameScore();
  
  public FrameScore roll(Integer newPins) {
	if ((pins.size()==0) && (newPins == 10))
		frame = new StrikeFrameScore();
    
    if (frame.shouldListenRoll(pins.size() +1))
    {
      pins.add(newPins);
    }
    
    return this;
  }

  public Integer score() {
    return pins.stream().mapToInt(i -> i.intValue()).sum();
  }

  public String name() {
    return frame.name();
  }

}
