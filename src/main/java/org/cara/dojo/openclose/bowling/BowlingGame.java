package org.cara.dojo.openclose.bowling;

import java.util.ArrayList;
import java.util.List;

public class BowlingGame {

  List<Integer> pins = new ArrayList<Integer>();

  public void roll(Integer newPins) {
    pins.add(newPins);
  }

  public Integer score() {
    return pins.stream().mapToInt(i -> i.intValue()).sum();
  }

}
