package org.cara.dojo.openclose.bowling;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BowlingGame {

  List<FrameScore> frames = new ArrayList<FrameScore>();

  public void roll(Integer newPins) {
	if (frames.isEmpty() || (frames.get(frames.size()-1).isFinished())) {
	  frames.add(new FrameScore());
	}

	frames.stream().map(frame -> frame.roll(newPins)).collect(Collectors.toList());
  }

  public Integer score() {
    return frames.stream().mapToInt(f -> f.score().intValue()).sum();
  }
}
