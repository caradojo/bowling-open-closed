package org.cara.dojo.openclose.bowling;

public class StrikeFrameScore implements IFrameScore {

	@Override
	public boolean shouldListenRoll(int nbRolls) {
		return nbRolls < 4;
	}

	@Override
	public String name() {
		return "Strike";
	}

	@Override
	public boolean isFinished(int nbRolls) {
		return nbRolls > 1;
	}

}
