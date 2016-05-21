package org.cara.dojo.openclose.bowling;

import java.util.ArrayList;
import java.util.List;

public class BowlingGame {

  List<FrameScore> frames = new ArrayList<FrameScore>();
  int nbRolls = 0;

  public void roll(Integer newPins) {
    if (nbRolls % 2 == 0) {
      frames.add(new FrameScore());
    }
    nbRolls++;

    frames.stream().forEach(f -> f.roll(newPins));
  }

  public Integer score() {
    return frames.stream().mapToInt(f -> f.score().intValue()).sum();
  }
}
