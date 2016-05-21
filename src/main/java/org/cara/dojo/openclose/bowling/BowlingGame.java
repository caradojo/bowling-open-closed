package org.cara.dojo.openclose.bowling;

public class BowlingGame {

  int score = 0;

  public void roll(int pins) {
    score += pins;
  }

  public int score() {
    return score;
  }

}
