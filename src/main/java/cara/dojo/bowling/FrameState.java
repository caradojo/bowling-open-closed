package cara.dojo.bowling;

import java.util.HashMap;
import java.util.Map;

import static cara.dojo.bowling.FrameState.State.*;

class FrameState {
  enum State {
    EMPTY {
      @Override
      int computeScore(Frame thisFrame, Frame nextFrame) {
        return 0;
      }
    }, FIRST {
      @Override
      int computeScore(Frame thisFrame, Frame nextFrame) {
        return 0;
      }
    }, STRIKE {
      @Override
      int computeScore(Frame thisFrame, Frame nextFrame) {
        return 10 + nextFrame.first() + nextFrame.second();
      }
    }, SECOND {
      @Override
      int computeScore(Frame thisFrame, Frame nextFrame) {
        return thisFrame.first() + thisFrame.second();
      }
    }, SPARE {
      @Override
      int computeScore(Frame thisFrame, Frame nextFrame) {
        return 10 + nextFrame.first();
      }
    };

    abstract int computeScore(Frame thisFrame, Frame nextFrame);
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

  private Map<State, FrameStateUpdate> stateUpdates = new HashMap<>();
  private Map<State, FrameStateFinished> stateFinished = new HashMap<>();
  private Map<State, FrameBuilder> frameBuilders = new HashMap<>();

  FrameState() {
    initStateUpdates();
    initStateFinished();
    initFrameBuilders();
  }

  void roll(int pins) {
    state = stateUpdates.get(state).on(pins);
  }

  boolean isFinished() {
    return stateFinished.get(state).isFinished();
  }

  Frame frame() {
    return frameBuilders.get(state).frame();
  }

  private void initStateUpdates() {
    stateUpdates.put(EMPTY,
            (pins) -> {
              firstPins = pins;
              return pins == 10 ? STRIKE : FIRST;
            }
    );
    stateUpdates.put(FIRST,
            (pins) -> {
              secondPins = pins;
              return pins + firstPins == 10 ? SPARE : SECOND;
            }
    );
    stateUpdates.put(STRIKE, (pins) -> STRIKE);
    stateUpdates.put(SECOND, (pins) -> SECOND);
    stateUpdates.put(SPARE, (pins) -> SPARE);
  }

  private void initStateFinished() {
    FrameStateFinished notFinished = () -> false;
    FrameStateFinished finished = () -> true;
    stateFinished.put(EMPTY, notFinished);
    stateFinished.put(FIRST, notFinished);
    stateFinished.put(STRIKE, finished);
    stateFinished.put(SECOND, finished);
    stateFinished.put(SPARE, finished);
  }

  private void initFrameBuilders() {
    FrameBuilder endFrameBuilder = () -> new Frame(state, firstPins, secondPins);
    frameBuilders.put(EMPTY, () -> { throw new IllegalStateException("Frame is empty"); });
    frameBuilders.put(FIRST, () -> { throw new IllegalStateException("Frame not finished"); });
    frameBuilders.put(STRIKE, endFrameBuilder);
    frameBuilders.put(SECOND, endFrameBuilder);
    frameBuilders.put(SPARE, endFrameBuilder);
  }
}
