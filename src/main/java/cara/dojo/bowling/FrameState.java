package cara.dojo.bowling;

import static cara.dojo.bowling.FrameState.State.*;

class FrameState {
  enum State {
    EMPTY, FIRST, STRIKE, SECOND, SPARE
  }
  @FunctionalInterface
  private interface FrameStateUpdate {
    State on(int pins);
  }
  @FunctionalInterface
  private interface FrameStateFinished {
    boolean isFinished();
  }
  @FunctionalInterface
  private interface FrameBuilder {
    Frame frame();
  }

  private State state = EMPTY;
  private int firstPins;
  private int secondPins;

  private FrameStateUpdate[] stateUpdates = new FrameStateUpdate[State.values().length];
  private FrameStateFinished[] stateFinished = {
          () -> false, () -> false, () -> true, () -> true, () -> true
  };
  private FrameBuilder frameBuilders[] = {
          () -> { throw new IllegalStateException("Frame is empty"); },
          () -> { throw new IllegalStateException("Frame not finished"); },
          () -> new Frame(state, firstPins, secondPins),
          () -> new Frame(state, firstPins, secondPins),
          () -> new Frame(state, firstPins, secondPins)
  };

  FrameState() {
    initStateUpdates();
  }

  void roll(int pins) {
    state = stateUpdates[state.ordinal()].on(pins);
  }

  boolean isFinished() {
    return stateFinished[state.ordinal()].isFinished();
  }

  Frame frame() {
    return frameBuilders[state.ordinal()].frame();
  }

  private void initStateUpdates() {
    stateUpdates[EMPTY.ordinal()] =
            (pins) -> {
              firstPins = pins;
              return pins == 10 ? STRIKE : FIRST;
            };
    stateUpdates[FIRST.ordinal()] =
            (pins) -> {
              secondPins = pins;
              return pins + firstPins == 10 ? SPARE : SECOND;
            };
    stateUpdates[STRIKE.ordinal()] = (pins) -> STRIKE;
    stateUpdates[SECOND.ordinal()] = (pins) -> SECOND;
    stateUpdates[SPARE.ordinal()] = (pins) -> SPARE;
  }
}
