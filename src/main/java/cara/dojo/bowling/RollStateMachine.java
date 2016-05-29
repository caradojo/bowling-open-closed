package cara.dojo.bowling;

class RollStateMachine {

  void run(int [] pins) {

    RollState state = RollState.READY;
    for (int i = 0; i < pins.length; i++) {
      int first = pins[i];
      int second = 0;

      state = state.updateState(first, 0);
      if (state == RollState.FIRST) {
        ++i;
        second = pins[i];
        state = state.updateState(second, first);
      }
      // go back to ready and emit events
      state.updateState(second, first);
    }
  }
}
