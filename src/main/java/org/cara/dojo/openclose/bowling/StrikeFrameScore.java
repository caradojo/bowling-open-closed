package org.cara.dojo.openclose.bowling;

public class StrikeFrameScore implements IFrameScore {

	@Override
	public boolean shouldListenRoll(int nbRolls) {
		return nbRolls < 2;
	}

	@Override
	public String name() {
		return "Strike";
	}

}
