package org.cara.dojo.openclose.bowling;

public class TwoRollsFrameScore implements IFrameScore {

	@Override
	public boolean shouldListenRoll(int nbRolls) {
		return nbRolls < 3;
	}
	
	@Override
	public String name() {
		return "TwoRolls";
	}

	@Override
	public boolean isFinished(int nbRolls) {
		return nbRolls > 2;
	}
}
