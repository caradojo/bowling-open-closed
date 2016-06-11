package org.cara.dojo.openclose.bowling;

public class TwoRollsFrameScore {

  public boolean shouldListenRoll(Integer nbRolls) {
    return nbRolls < 3;
  }

}
